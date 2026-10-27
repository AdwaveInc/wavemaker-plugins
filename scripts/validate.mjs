#!/usr/bin/env node

/**
 * Validates every host package in this repository against its documented rules:
 *
 * - plugin.json, mcp.json: Agent Plugins 1.0.0 (Codex/ChatGPT, Cursor, Kiro, Grok Build)
 *   https://agent-plugins.org, OpenAI extension fields:
 *   https://developers.openai.com/plugins/build/plugins
 * - .cursor-plugin/plugin.json: https://cursor.com/docs/reference/plugins
 * - .claude-plugin/{plugin,marketplace}.json, .mcp.json: https://code.claude.com/docs/en/plugins-reference
 * - .agents/plugins/marketplace.json: Codex repo marketplace
 * - gemini-extension.json: https://geminicli.com/docs/extensions/reference/
 * - server.json: https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json
 * - skills/<name>/SKILL.md: https://agentskills.io/specification
 *
 * and that they agree: one name, one version, one MCP URL, no credentials.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MCP_URL = "https://api.wavemaker.io/mcp";
const NAME = "wavemaker";
const errors = [];
const fail = (message) => errors.push(message);

function json(path) {
  const full = join(root, path);
  if (!existsSync(full)) return fail(`${path} is missing`);
  try {
    return JSON.parse(readFileSync(full, "utf8"));
  } catch (error) {
    return fail(`${path} is not valid JSON: ${error.message}`);
  }
}

function onlyKeys(label, object, allowed) {
  for (const key of Object.keys(object ?? {})) {
    if (!allowed.includes(key)) fail(`${label} has unknown field "${key}"`);
  }
}

function asset(label, path) {
  if (typeof path !== "string" || path.includes("..") || path.startsWith("/")) {
    return fail(`${label} must be a relative path inside the repository: ${path}`);
  }
  if (!existsSync(join(root, path))) fail(`${label} points at a missing file: ${path}`);
}

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if ([".git", "node_modules"].includes(entry)) return [];
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const versions = new Map();
const urls = new Map();

// Agent Plugins root manifest (closed schema) with the OpenAI extension.
const plugin = json("plugin.json");
if (plugin) {
  onlyKeys("plugin.json", plugin, [
    "$schema", "name", "version", "description", "author", "homepage",
    "repository", "license", "keywords", "extensions",
  ]);
  if (plugin.$schema !== "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json") {
    fail("plugin.json $schema must be the Agent Plugins 1.0.0 schema");
  }
  onlyKeys("plugin.json author", plugin.author, ["name", "email", "url"]);
  versions.set("plugin.json", plugin.version);
  const ui = plugin.extensions?.["com.openai"]?.interface ?? {};
  for (const key of [
    "displayName", "shortDescription", "longDescription", "developerName", "category",
    "capabilities", "websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL",
    "composerIcon", "logo",
  ]) {
    if (ui[key] === undefined) fail(`plugin.json OpenAI interface needs "${key}"`);
  }
  if ((ui.displayName ?? "").length > 30) fail("OpenAI displayName must be at most 30 characters");
  if ((ui.shortDescription ?? "").length > 30) fail("OpenAI shortDescription must be at most 30 characters");
  if ((ui.longDescription ?? "").length > 4000) fail("OpenAI longDescription must be at most 4000 characters");
  if (!Array.isArray(ui.defaultPrompt) || ui.defaultPrompt.length > 3 || ui.defaultPrompt.some((p) => p.length > 128)) {
    fail("OpenAI defaultPrompt takes up to 3 prompts of at most 128 characters");
  }
  for (const key of ["websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"]) {
    if (!String(ui[key]).startsWith("https://")) fail(`OpenAI ${key} must be https`);
  }
  for (const key of ["composerIcon", "logo"]) {
    if (!String(ui[key]).startsWith("./")) fail(`OpenAI ${key} must start with ./`);
    asset(`OpenAI ${key}`, ui[key]);
  }
  if (plugin.extensions?.["com.openai"]?.hooks) fail("Lifecycle hooks make a plugin ineligible for OpenAI's directory");
}

const mcp = json("mcp.json");
if (mcp) {
  onlyKeys("mcp.json", mcp, ["$schema", "mcpServers"]);
  const server = mcp.mcpServers?.[NAME];
  onlyKeys("mcp.json server", server, ["type", "url", "headers"]);
  if (server?.type !== "streamable-http") fail('mcp.json server type must be "streamable-http"');
  urls.set("mcp.json", server?.url);
}

const claudeMcp = json(".mcp.json");
if (claudeMcp) {
  const server = claudeMcp.mcpServers?.[NAME];
  if (server?.type !== "http") fail('.mcp.json server needs type "http" (Claude Code skips untyped remote entries)');
  urls.set(".mcp.json", server?.url);
}

const cursor = json(".cursor-plugin/plugin.json");
if (cursor) {
  onlyKeys(".cursor-plugin/plugin.json", cursor, [
    "name", "displayName", "description", "version", "minClientVersions", "author", "publisher",
    "homepage", "repository", "license", "logo", "keywords", "category", "tags", "commands",
    "agents", "skills", "rules", "hooks", "variables", "mcpServers",
  ]);
  versions.set(".cursor-plugin/plugin.json", cursor.version);
  asset("Cursor logo", cursor.logo);
  if (cursor.mcpServers !== "./mcp.json") fail('Cursor mcpServers must be "./mcp.json"');
}

const claude = json(".claude-plugin/plugin.json");
if (claude) {
  versions.set(".claude-plugin/plugin.json", claude.version);
  if (claude.name.startsWith("claude-") || claude.name.startsWith("anthropic-")) fail("Claude plugin name prefix is reserved");
  asset("Claude icon", claude.icon);
}

const claudeMarket = json(".claude-plugin/marketplace.json");
if (claudeMarket) {
  if (!claudeMarket.name || !claudeMarket.owner?.name) fail("Claude marketplace needs name and owner.name");
  const entry = claudeMarket.plugins?.find((p) => p.name === NAME);
  if (entry?.source !== "./") fail('Claude marketplace entry must have source "./"');
  versions.set(".claude-plugin/marketplace.json", entry?.version);
}

const codexMarket = json(".agents/plugins/marketplace.json");
if (codexMarket) {
  const entry = codexMarket.plugins?.find((p) => p.name === NAME);
  if (!entry?.policy?.installation || !entry?.policy?.authentication || !entry?.category) {
    fail("Codex marketplace entry needs policy.installation, policy.authentication and category");
  }
  if (entry?.source?.path !== "./") fail('Codex marketplace source.path must be "./"');
}

const gemini = json("gemini-extension.json");
if (gemini) {
  versions.set("gemini-extension.json", gemini.version);
  urls.set("gemini-extension.json", gemini.mcpServers?.[NAME]?.httpUrl);
}

const registry = json("server.json");
if (registry) {
  if (!/^[a-zA-Z0-9.-]+\/[a-zA-Z0-9._-]+$/.test(registry.name)) fail("server.json name is not namespace/name");
  if (!registry.description || registry.description.length > 100) fail("server.json description must be 1-100 characters");
  versions.set("server.json", registry.version);
  urls.set("server.json", registry.remotes?.[0]?.url);
  if (registry.remotes?.[0]?.type !== "streamable-http") fail("server.json remote must be streamable-http");
}

// Every manifest names the same release and the same server.
for (const [file, version] of versions) {
  if (!/^\d+\.\d+\.\d+$/.test(version ?? "")) fail(`${file} version must be semver`);
  if (version !== plugin?.version) fail(`${file} version ${version} differs from plugin.json ${plugin?.version}`);
}
for (const [file, url] of urls) {
  if (url !== MCP_URL) fail(`${file} MCP URL must be ${MCP_URL} (found ${url})`);
}
for (const [file, manifest] of [["plugin.json", plugin], [".cursor-plugin/plugin.json", cursor], [".claude-plugin/plugin.json", claude], ["gemini-extension.json", gemini]]) {
  if (manifest && manifest.name !== NAME) fail(`${file} name must be "${NAME}"`);
}

// Agent Skills: name matches the folder, short description, standard frontmatter only.
const skillsDir = join(root, "skills");
for (const name of existsSync(skillsDir) ? readdirSync(skillsDir) : []) {
  const file = join(skillsDir, name, "SKILL.md");
  if (!existsSync(file)) continue;
  const match = readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    fail(`skills/${name}/SKILL.md has no frontmatter`);
    continue;
  }
  const front = match[1];
  const top = [...front.matchAll(/^([a-z-]+):/gm)].map((m) => m[1]);
  onlyKeys(`skills/${name} frontmatter`, Object.fromEntries(top.map((k) => [k, 1])), [
    "name", "description", "license", "compatibility", "metadata", "allowed-tools",
  ]);
  const value = (key) => (front.match(new RegExp(`^${key}: (.*)$`, "m")) ?? [])[1] ?? "";
  if (value("name") !== name) fail(`skills/${name}: name must equal the folder name`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) fail(`skills/${name}: invalid skill name`);
  const description = value("description");
  if (!description || description.length > 1024) fail(`skills/${name}: description must be 1-1024 characters`);
  if (value("compatibility").length > 500) fail(`skills/${name}: compatibility must be at most 500 characters`);
  // metadata is a map of strings (nested maps break strict Agent Skills validators).
  for (const line of front.split("\n").slice(front.split("\n").findIndex((l) => l === "metadata:") + 1)) {
    if (!line.startsWith("  ")) break;
    if (!/^  [a-z0-9-]+: ".*"$/.test(line)) fail(`skills/${name}: metadata values must be quoted strings: ${line.trim()}`);
  }
}

// No credentials anywhere in the package.
const secret = /(sk-[A-Za-z0-9]{20,}|wm_[A-Za-z0-9]{20,}|Bearer [A-Za-z0-9._-]{20,}|"(client_secret|api[_-]?key|password)"\s*:)/;
for (const file of walk(root)) {
  if (/\.(png|jpg|jpeg|webp|gif|ico)$/.test(file)) continue;
  if (file.endsWith("scripts/validate.mjs")) continue;
  if (secret.test(readFileSync(file, "utf8"))) fail(`${relative(root, file)} looks like it contains a credential`);
}
for (const junk of [".DS_Store"]) {
  if (walk(root).some((file) => file.endsWith(junk))) fail(`Remove ${junk} files`);
}

if (errors.length) {
  for (const message of errors) console.error(`error: ${message}`);
  process.exit(1);
}
console.log(`ok: ${versions.size} manifests at ${plugin.version}, MCP ${MCP_URL}`);
