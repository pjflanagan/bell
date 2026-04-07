# Bell Feasibility Research
## Date: 2026-04-07

---

## Does anything like this exist?

Yes. The landscape of file-based HTTP DSL tools is active. Key players:

### Direct competitors

**Bruno** (`usebruno.com`)
The closest structural analog. Stores each request as a `.bru` file (custom indentation-based markup). Collections are folders, fully git-committable. Has both a GUI app and a `bru run` CLI. Environments are JSON files in the collection directory. Scripting (pre/post request) is embedded JavaScript. Assertions use Chai-style `expect()` in test blocks. Request chaining across files is possible via JS scripting (`bru.runRequest()`), though awkward. No interactive prompts — designed for automated workflows.

```bru
meta {
  name: Login
  type: http
}
post {
  url: {{baseUrl}}/login
  body: json
}
body:json {
  { "username": "{{user}}", "password": "{{pass}}" }
}
script:post-response {
  bru.setEnvVar("token", res.body.token);
}
tests {
  test("status is 200", function() {
    expect(res.status).to.equal(200);
  });
}
```

**Hurl** (`hurl.dev`)
Rust-based CLI tool running `.hurl` files. Purpose-built DSL for HTTP request sequences. Supports JSONPath/XPath captures, rich assertion DSL (`[Asserts]` sections), variable injection via CLI flags. Excellent for CI/CD pipelines. Fast, zero dependencies, JUnit XML output. No GUI. No interactive prompts — fully automated/deterministic.

```hurl
POST https://example.com/login
{ "user": "alice", "pass": "secret" }
HTTP 200
[Captures]
token: jsonpath "$.token"

GET https://example.com/profile
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.name" == "Alice"
```

**httpYac**
Extends the RFC-standard `.http` format with a CLI runner (`httpyac`), embedded JavaScript regions, VS Code extension, dotenv integration, and GraphQL/WebSocket/gRPC/MQTT support. Compatible with REST Client files. Has CI-ready headless mode. Environments via `.httpyac.js` config. No interactive prompts.

### Adjacent tools (less direct competition)

**REST Client** (VS Code extension) — Huge adoption, `.http` format, VS Code only, no CLI, no assertions. Environments live in IDE settings, not in committed files.

**Insomnia** — GUI-first, `inso` CLI for CI, machine-generated YAML format (not human-authored). Ownership/login controversy reduced community trust.

**HTTPie** — CLI curl replacement, one request per invocation, not a scripting language.

**Karate DSL** — Gherkin syntax, JVM, powerful matching/assertion language, build-tool-dependent. Wrong ergonomics for a dev-workflow tool.

**k6** — JavaScript-based load/performance testing, wrong problem domain.

---

## Feature matrix

| Feature | Bell | Hurl | Bruno | REST Client | httpYac |
|---|---|---|---|---|---|
| Text-file DSL | Yes (.bel) | Yes (.hurl) | Yes (.bru) | Yes (.http) | Yes (.http) |
| Git-friendly | Yes | Yes | Yes | Partial* | Yes |
| Multi-request sequences | Yes | Yes | Yes (folders) | Yes (###) | Yes |
| Variable interpolation | Yes (`{var}`) | Yes (`{{var}}`) | Yes (`{{var}}`) | Yes (`{{var}}`) | Yes (`{{var}}`) |
| Environment management | Yes (JSON + inline) | Via CLI flags | Yes (JSON files) | IDE settings | Via config |
| Inline env selection prompt | **Yes** | No | No | No | No |
| `input()` runtime prompt | **Yes** | No | No | No | No |
| `warn` safety guard | **Yes** | No | No | No | No |
| Assertions/testing | Yes (expect) | Yes (rich DSL) | Yes (Chai/JS) | No | Yes (JS) |
| TS type validation | **Yes (validate X as T)** | No | No | No | No |
| Request composition | **Yes (request "file.bel")** | No | Via scripting | No | No |
| Postman import | Yes | No | Yes | No | No |
| VS Code extension | Yes | No | Yes (GUI app) | Yes | Yes |
| Pure CLI | Yes | Yes | Yes | No | Yes |

*REST Client environments live in VS Code settings, not committed files.

---

## Where Bell is genuinely differentiated

### 1. Interactive, human-in-the-loop execution
No other tool in this space supports:
- `input("prompt")` — pause execution and collect user input mid-script
- `warn "value"` — halt and require explicit confirmation before proceeding
- `env "dev" | "prod"` — prompt the user interactively to choose an environment at runtime

Every tool gaining traction (Hurl, Bruno, httpYac) assumes fully automated, non-interactive execution. Bell is the only tool designed for a developer running scripts against live systems where they need to supply secrets at runtime and confirm destructive operations before firing them.

### 2. TypeScript-native type validation
`validate response.body as UserResponse` — using TypeScript type definitions already in the codebase to validate response shapes — is unique. No other HTTP DSL tool does this. It catches API contract drift without a separate schema validation framework.

### 3. Request composition as inline sub-scripts
`request "login.bel"` inlines another file and makes its `export`ed variables available to the caller. This is more compositional than Bruno's folder sequencing or Hurl's capture variables — it mirrors how developers think about calling functions.

---

## Honest risks

**For automated/CI use**, Bell competes with Hurl and Bruno CLI, both more mature with larger ecosystems. Hurl's assertion DSL is tighter; Bruno has a GUI for request building. Bell cannot win on that terrain in the short term.

**For VS Code integration**, REST Client and httpYac have much larger install bases.

**The open question**: are `input()` and `warn` genuinely underserved needs, or has the market implicitly decided interactive prompts in HTTP scripts are not a priority? The dominant pattern in winning tools is deterministic/automated. Bell's bet is that the "human running this against prod" workflow is real and underserved.

---

## Verdict

Worth pursuing. The generic "git-friendly Postman alternative" space is crowded, but Bell has a defensible position if it commits to the interactive-and-safety-oriented use case and leans hard into TypeScript integration. Those two angles have no competition.
