# Publishing

Steps to publish Bell components to NPM and the VS Code Marketplace.

---

## NPM: `bell-lang`

Publish the core package first, since the VS Code extension depends on the CLI being available via `npx`/global install.

**Prerequisites**
- An npm account with publish access to `bell-lang`
- Run `npm login` if not already authenticated

**Steps** (run from `packages/core/`)

1. Build and verify tests pass:
   ```bash
   npm run build
   npm test
   ```

2. Confirm `package.json` has correct `bin`, `main`, and `files` fields, and that `dist/src/cli.js` starts with `#!/usr/bin/env node`.

3. Bump the version:
   ```bash
   npm version patch   # or minor / major
   ```

4. Publish:
   ```bash
   npm publish --access public
   ```

Live package: https://www.npmjs.com/package/bell-lang

---

## VS Code: Bell Extension

**Prerequisites**
- `vsce` installed: `npm install -g @vscode/vsce`
- A publisher account on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage) — current publisher ID is `bell`
- A Personal Access Token (PAT) from Azure DevOps:
  1. Go to [dev.azure.com](https://dev.azure.com) and sign in
  2. Click your profile icon (top right) → **Personal access tokens**
  3. Click **New Token**
  4. Set **Organization** to `All accessible organizations`
  5. Under **Scopes**, select `Marketplace` → `Publish`
  6. Copy the token immediately — it will not be shown again

**Steps** (run from `packages/vscode/`)

1. Compile the extension:
   ```bash
   npm run compile
   ```

2. Package:
   ```bash
   vsce package --no-dependencies
   ```
   > The `--no-dependencies` flag is required in this monorepo to prevent `vsce` from following workspace symlinks and throwing "invalid relative path" errors.

3. Publish:
   ```bash
   vsce publish --no-dependencies
   ```
   Or upload the generated `.vsix` manually via the Marketplace dashboard.

4. Dashboard:
   https://marketplace.visualstudio.com/manage/publishers/bell

---

## Post-Publish

Tag the release in git:
```bash
git tag v<version>
git push --tags
```
