# Rust command boundaries

`wavemaker` is the native Rust product CLI. Its libraries own HTTP transport to
the Wavemaker service, direct Comfy execution and local agent supervision. Media
work runs on the service through its twelve tools (search, read, write, generate,
edit, compose, watch, listen, compare, review, deliver, run); install any other
program the task needs in the native environment where the agent works. A missing
tool is a setup issue, not permission to invent support or switch providers.

Each fresh CLI conversation has its own working folder and temporary directory.
Keep scratch files in that folder or use `TMPDIR`/`TMP`/`TEMP` (Python's
`tempfile` honors these). Fixed names under global `/tmp` can overwrite another
conversation's files. Provider login, account credits and compute remain shared.

Use `wavemaker --help`, `wavemaker tools`, and individual `--help` for discovery.
Call a tool with `wavemaker api call TOOL --arguments JSON [--request-id ID]
[--remote-project PROJECT] --json`; the service validates the arguments and names
the failing path. `wavemaker api list --json` lists the tools and the operations
the service serves, and `wavemaker api inspect NAME --json` shows an operation's
schemas. Schemas, not guessed positional translations, define those arguments.
Pass `--json` whenever you read CLI output: it emits the versioned result envelope,
while a terminal otherwise shows a human summary. Native chat keeps its terminal output.

Shell redirection creates the response file before the CLI finishes. If the shell
tool returns a running process/session ID, wait or poll that ID until it exits
before parsing the file or starting a dependent call. File existence is not
completion. Check the exit status and the JSON envelope's `ok`/`error` before
using `data`; keep independent calls parallel.

Call the tools directly; a Python wrapper is unnecessary. A timeout on a call
that carries a request ID leaves it unconfirmed, not failed: repeat it with the
same `--request-id` and the service returns the original result (never a second
job). Long work answers with a job: follow it with `read wm://job/<id>` and
`wait_s` (the service caps it at 85; pass `--timeout 100` for a wait over 25,
since the default `--timeout` is 30), or `wavemaker watch JOB_ID`; a watch timeout never cancels
the job and never justifies a new request ID.
`session inspect DIR --json` reports frozen executable/guidance identities and
`browserReview`; start, attach and resume preserve those identities. Missing
historical identity is unrecorded, not evidence of the current build. Compare with
`wavemaker doctor --json` and explicitly reinstall drifted guidance using
`wavemaker setup --reinstall` (owner files are preserved). An active thread's loaded
guidance is not refreshed by source edits. Observe its existing jobs first; when
settled and explicitly stopped, `session recover DIR --out NEW_DIR --controller ID`
can resume the original native thread with verified current guidance, without a
new turn or replacement job. Keep the original session/replay unchanged.

These routes cannot be updated in place:

| Route | Transition |
| --- | --- |
| Live / not `confirmed_stopped` | Observe existing jobs; explicit stop; then `session recover` |
| Grok or Claude session | Stop; start a **new** session. Process replacement needs a resumable Codex thread |
| Supervisor build mismatch | Stop; start a new session |
| No native thread id | Cannot recover in place |
| Active Codex thread | Source edits and reconnect do not refresh loaded guidance; stop, `setup --reinstall`, recover or start new |
| Package-manager binary | Update through brew/scoop/winget, not in-place CLI replace |
| Shared-project owner `AGENTS.md` | Leave as owner data; `setup --reinstall` preserves it |

Before running a script, inspect `wavemaker doctor --json` for installed tools.
Use `python3` on macOS/Linux; a bare `python` is not present on every machine.
Missing tools require setup in this execution environment.
When the shell tool offers a login-shell setting, use `login: false` to retain
this session's selected tool PATH; macOS login shells can put system tools first.

- Account: `wavemaker login`; browser PKCE credentials are kept outside projects.
  `wavemaker auth status --json` reports offline credential state; `auth logout` removes
  only this service's saved credentials, not server grants or environment tokens.
  `wavemaker service show --json` inspects selection; `service select ORIGIN` saves it.
- Workspace: `wavemaker setup`; user-edited guidance and source are preserved.
- Native terminal: `wavemaker chat --agent codex|grok|claude`; provider login and
  permissions remain separate from Wavemaker account access. Default chat uses a
  fresh working folder; `--shared-workspace` edits the selected project.
- Local controlled agent: `wavemaker session start --directory DIR`, then
  `session claim DIR --controller ID`. Mutations require that unexpired controller
  ID; use `session events` for durable replay and `session stop` for owned cleanup.
  Check adapter capabilities before steering, resuming or responding to approvals.
  `workspace inspect|import|export` copies explicit files; export does not overwrite.
  Imports publish only verified complete bytes. `publication_unconfirmed` means the
  named file exists, but its receipt or durability could not be fully confirmed;
  inspect the destination and workspace receipt before retrying, never overwrite it.
- Standalone Comfy: `wavemaker runtime connect URL`, `nodes search`,
  `nodes inspect CLASS`, `models`, `graph validate GRAPH`, then
  `run GRAPH --request-id ID --wait` and `outputs RUN_ID --out DIR`. For several
  independent takes, run each without `--wait`, then `watch RUN_ID --jsonl` them
  concurrently.
  This path needs no Wavemaker account. Use `--input node.field=FILE` to freeze and
  stage local input; `--output-node ID` explicitly requires an intermediate output.
  `wavemaker runtime disconnect` returns the workspace to service routing without
  deleting run state or stopping the personal server.
- Connected service: without a standalone runtime profile, `run GRAPH --request-id ID`
  submits the graph with the `generate` tool; `watch`, `outputs` and `cancel` read,
  collect and cancel `wm://job/<id>`; `runs` lists the workspace's jobs, open first,
  but keep each job ID you start. `files upload` and `files download` verify bytes and hashes;
  `files upload --resumable` uses the explicit chunk protocol.
- Hosted agent: `wavemaker make "BRIEF" --json` hands a brief to the service's own
  agent and follows it; `production watch|steer|approve|interrupt RUN_ID` direct it.

Stock voice catalogs and saved-voice IDs are native: `wavemaker provider voices
{xai|openai}` and `wavemaker assets voice NAME --version N`. Speech itself is a
`generate` route (`search` with `kinds: ["route"]`). There is no default voice.

Keep request IDs and original bytes after uncertainty. Observer interruption
does not cancel a remote job. Lost binary upload acknowledgement does not provide
a transfer ID; inspect by source hash before deciding whether to upload again.
A missing supervisor is indeterminate, not evidence that its child stopped.
Generation success, complete collection and useful-media review are separate.

`build-info --json` identifies executable/source content. `doctor` is offline;
`doctor --probe` checks service/native protocol without model calls or login changes.
Protocol readiness is not authenticated model readiness. Connected `run` accepts
`--max-microcredits N`, bound to retained intent; direct Comfy refuses monetary caps.
`media compose FILE --request-id ID --timeout 600` renders a JSON document with
`composition` and owned-artifact `assets`; the `compose` tool renders a timeline.
`session list --root DIR`, `inspect DIR`, `archive DIR --out NEW_DIR` and
`cleanup DIR --archive NEW_DIR --confirm SESSION_UUID` support explicit private
housekeeping. Archive/cleanup require confirmed stopped state. Cleanup moves the
original control directory to recovery after verified archiving, without moving
working media, disk reclamation or PID signals. Journal archive is not a media
backup. Raw journal archives remain sensitive.
