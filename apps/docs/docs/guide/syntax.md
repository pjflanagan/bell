# Bell Syntax Guide

The Bell language is designed to be as close to plain English as possible for making HTTP requests.

## Variables and String Interpolation

Assign values to variables with `=`. Use `{variableName}` to interpolate a variable into a string.

<<< @/../../../examples/guide/variables.bel

## Request Building

Use these keywords to build up your HTTP request before sending it.

### `url`

Sets the full base URL for the request. When an environment is active, `path` should be used instead and the base URL comes from the environment config.

### `path`

Appends a path segment to the base URL.

<<< @/../../../examples/guide/url-path.bel

### `param`

Adds query parameters to the URL.

<<< @/../../../examples/guide/params.bel

### `header` and `headers`

Adds HTTP headers to the request. Use `header` for individual headers or `headers` to set them all at once with an object.

<<< @/../../../examples/guide/headers.bel

### `body`

Sets the request body. Typically used with `POST`, `PUT`, and `PATCH`.

<<< @/../../../examples/guide/body.bel

## Sending a Request

Writing an HTTP method keyword dispatches the currently built request.

<<< @/../../../examples/guide/http-methods.bel

## Logging

Use `log` to print a value to the console during execution. You can log any expression, including response data, variables, and the current URL.

<<< @/../../../examples/guide/log.bel

## Response

After a request is dispatched, the `response` object is set. Bell keeps a history of all responses made in a file.

<<< @/../../../examples/guide/response.bel

## User Interaction

### `input`

Prompts the user for a value at runtime. The result can be assigned to a variable or used inline. Add `? defaultValue` so the user can press Enter to accept a default.

<<< @/../../../examples/guide/input.bel

### `warn`

Displays a confirmation prompt before continuing. As an expression, it returns the value if confirmed. As a statement, it shows the message and waits for confirmation.

<<< @/../../../examples/guide/warn.bel

## Testing

### `expect`

Checks that an expression is truthy and logs the result. Execution continues whether the check passes or fails. Use `assert` if you want the file to stop on failure.

<<< @/../../../examples/guide/expect.bel

### `assert`

Checks that an expression is truthy. If it fails, execution stops immediately with a non-zero exit code. Use this for post-condition checks after a request.

```bel
assert response.status === 200
assert response.body.id !== null
```

### `require`

Like `assert`, but used as a pre-condition guard placed before a request. If the required variable or expression is falsy, execution stops before the request is sent.

```bel
require token
require id

url "https://api.example.com/posts/{id}"
header "Authorization" `Bearer {token}`
DELETE
```

### `validate`

Validates that a value matches a TypeScript type at runtime. Useful for verifying request and response shapes stay in sync with your type definitions.

<<< @/../../../examples/guide/validate.bel

## Imports

Bell supports three import forms.

<<< @/../../../examples/guide/import.bel

## .env Files

Bell can load standard `.env` files directly. All three import forms work with `.env` files (detected by filename, not extension).

::: code-group

<<< @/../../../examples/guide/dotenv.bel [dotenv.bel]

<<< @/../../../examples/guide/sample.env [.env]

:::

The special key `BELL_URL` sets the base URL so that `path` statements work without an explicit `url` call — the same role the `"url"` key plays in a JSON environment config.

Bell prints a warning if the `.env` file is not found, since it is commonly gitignored.

## Environments

Environments let you switch between configurations (dev, staging, prod) without changing your Bell files. Define them in a JSON config and load it with an anonymous import.

The config JSON maps environment names to objects. The `url` key sets the base URL; any other keys become variables.

<<< @/../../../examples/guide/env-config.json

Use the `env` keyword to select an environment before running requests.

<<< @/../../../examples/guide/env.bel

## Multi-file Workflows

### `run`

Runs another Bell file inline. Any variables the sub-file `export`s become available in the calling file.

::: code-group

<<< @/../../../examples/guide/request-main.bel [request-main.bel]

<<< @/../../../examples/guide/request-sub.bel [request-sub.bel]

:::

### `export`

Marks variables to be shared with any file that `run`s this one.

<<< @/../../../examples/guide/export.bel

## Keywords as Identifiers

Bell keywords like `url`, `body`, and `headers` can be used as variable names in expressions — for example, to log the current URL or read fields from the response body.

```bel
log url
log body.data.entry
```
