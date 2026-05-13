# Migrate from Postman

Bell can convert a Postman collection into `.bel` files using the `bell convert` command. This page walks you through exporting your collection from Postman and running the conversion.

## Step 1: Export from Postman

1. Open Postman and select the collection you want to migrate.
2. Click the **&hellip;** (three-dot menu) next to the collection name.
3. Select **Export**.
4. Choose **Collection v2.1** as the format.
5. Click **Export** and save the file (e.g. `my-api.postman_collection.json`).

## Step 2: Convert to Bell

Run the `convert` command, pointing it at the exported JSON file:

```bash
bell convert my-api.postman_collection.json
```

This creates a `bell-scripts/` directory in your current folder containing one `.bel` file per request in the collection.

To write the output to a specific directory, use the `-o` flag:

```bash
bell convert my-api.postman_collection.json -o ./bell
```

## Step 3: Run the converted files

Each generated file corresponds to a single request. Run one with:

```bash
bell run bell/get-users.GET.bel
```

## What gets converted

| Postman feature | Bell equivalent |
|---|---|
| Request URL | `url` |
| Path variables | `path` |
| Query parameters | `param` |
| Request headers | `header` |
| Request body (JSON) | `body` |
| HTTP method | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` |
| Collection variables | Bell variables (`name = "value"`) |

::: info
Environment variables and pre-request scripts are not automatically converted. You can add these manually after conversion — see [Syntax](/guide/syntax) for how to define environments and variables.
:::
