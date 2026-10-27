# Changelog

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
