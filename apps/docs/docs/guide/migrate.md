# Converting to Bell

Bell can import your existing API definitions from **Postman collections** and **OpenAPI specs**, converting them into runnable `.bel` files.

---

## From Postman

### Step 1: Export your collection

1. Open Postman and find the collection you want to convert.
2. Click the **&hellip;** menu next to the collection name.
3. Select **Export** → **Collection v2.1**.
4. Save the JSON file (e.g. `my-api.postman_collection.json`).

### Step 2: Run `bell postman`

```bash
bell postman my-api.postman_collection.json
```

This creates a `bell/` folder with one `.bel` file per request. Folders in the collection become subdirectories:

```
bell/
  users/
    get_users.GET.bel
    create_user.POST.bel
  auth/
    login.POST.bel
```

Use `-o` to write to a different directory:

```bash
bell postman my-api.postman_collection.json -o ./api
```

### What gets converted

| Postman | Bell |
|---|---|
| Request URL | `url` |
| Path variables | `{variable}` interpolation |
| Query parameters | `param` |
| Request headers | `headers { ... }` |
| Request body (JSON) | `body { ... }` |
| HTTP method | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` |
| Collection folders | Subdirectories |
| `{{variables}}` syntax | `{variables}` syntax |

::: info
Environment variables and pre-request scripts are not converted automatically. Add them manually after conversion — see [Syntax](/guide/syntax) for how to define environments and variables.
:::

---

## From OpenAPI

### Step 1: Have your spec ready

Bell accepts **OpenAPI 3.x** specs in JSON or YAML format. Swagger 2.0 is not supported.

### Step 2: Run `bell openapi`

```bash
bell openapi my-api.openapi.json
```

YAML specs work the same way:

```bash
bell openapi my-api.yaml -o ./bell
```

Bell reads the spec and generates one `.bel` file per operation, grouped by tag (falling back to the first path segment). If the spec defines `servers`, Bell also generates an `env.json`:

```
bell/
  env.json
  users/
    list_users.GET.bel
    create_user.POST.bel
    get_user.GET.bel
  posts/
    list_posts.GET.bel
```

### What gets converted

| OpenAPI | Bell |
|---|---|
| `servers[].url` | `env.json` + `import` + `path` |
| `operationId` | File name (e.g. `list_users.GET.bel`) |
| `tags[0]` | Subdirectory name |
| Path parameters `{id}` | Bell variable declaration + `{id}` in path |
| Query parameters | `param` |
| Header parameters | `header` |
| `requestBody` schema | `body { ... }` with example values |
| Security schemes | Commented `# header "Authorization" ...` |
| 2xx response code | `expect response.status === N` |

### Generated files

Given a spec with two servers and a `GET /users/{userId}` operation tagged `Users`:

::: code-group

```json [env.json]
{
  "production": {
    "url": "https://api.example.com"
  },
  "staging": {
    "url": "https://staging.api.example.com"
  }
}
```

```bel [users/get_user.GET.bel]
### Get a user

import "../env.json"
env "production" | "staging"

userId = "example"

path "/users/{userId}"

GET

expect response.status === 200
```

:::

Running `bell run users/get_user.GET.bel` will prompt you to choose an environment, then make the request against the corresponding base URL.

::: info
After conversion, review each file and replace placeholder values (`"example"`, `"YOUR_TOKEN"`, etc.) with real data. See [Syntax](/guide/syntax) for authentication patterns and environment setup.
:::
