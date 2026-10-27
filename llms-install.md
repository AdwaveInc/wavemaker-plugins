# Installing Wavemaker (for agents)

Wavemaker is a remote MCP server. There is nothing to download, build or run locally.

1. Add a remote MCP server named `wavemaker`:
   - URL: `https://api.wavemaker.io/mcp`
   - Transport: Streamable HTTP
   - Authentication: OAuth (the server advertises its authorization server; dynamic client
     registration is supported). Do not ask the user for an API key.
2. Connect. A browser window opens for the user to sign in to Wavemaker (accounts are free at
   https://wavemaker.io) and approve `read run write`.
3. Check the connection by calling the `search` tool with `{"query": "video formats"}`.

If the client cannot do OAuth, the user can create a workspace key in the Wavemaker web app
(Connections → Developer setup) and the server is added with the header
`Authorization: Bearer <key>`. Store the key in the client's secret store, never in a
repository.

For a client that runs only local (stdio) servers:

```json
{
  "mcpServers": {
    "wavemaker": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://api.wavemaker.io/mcp"]
    }
  }
}
```

How to use the tools: `skills/wavemaker/SKILL.md` in this repository.
