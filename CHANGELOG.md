# Changelog

## 3.0.0 (2026-11-25)

- The skill is now the one Wavemaker exports for every outside agent (Claude Code, Codex,
  Cursor, any MCP client), built in Wavemaker's own repository and copied here unchanged.
  It covers MCP, HTTP and the `wavemaker` CLI, and it opens every link it names.
- Craft advice comes from Wavemaker's knowledge cards (`read wm://card/<id>`), with a job
  table that points at the right card for each kind of work. Defaults, pitfalls and
  playbooks by format ship beside `SKILL.md`.
- Search kinds the service refused (`template`) are gone.

## 2.0.0 (2026-10-27)

- One repository for every host (renamed from `wavemaker-cursor-plugin`): Agent Plugins root
  manifest with OpenAI listing metadata (Codex, ChatGPT, Cursor, Kiro, Grok Build), Cursor and
  Grok Bot, Claude Code plugin and `adwave` marketplace, Codex repo marketplace, Gemini CLI
  extension, and `server.json` for the official MCP Registry (`io.wavemaker/wavemaker`).
- The skill now covers the twelve current tools (`search`, `read`, `write`, `generate`, `edit`,
  `compose`, `watch`, `listen`, `compare`, `review`, `deliver`, `run`), prices work before
  spending, follows jobs without resubmitting, and tells the agent when to use Wavemaker.
- Current Wavemaker icon; homepage `https://wavemaker.io`.
- `scripts/validate.mjs` checks every manifest; CI runs it with the Claude and registry validators.

## 1.0.0

- Cursor Marketplace plugin for the Wavemaker MCP server.
