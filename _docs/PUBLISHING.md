# Publishing TODOs

Steps to publish Bell components to NPM and the VS Code Marketplace.

## 📦 NPM: bell-lang

The core engine and CLI needs to be published first.

- [x] **Account Setup**: 
  - Ensure access to an npm account.
  - Run `npm login`.
  - **Note**: Package renamed to `bell-lang` (was bell-cli/core).
- [x] **Final Build & Test**:
  - Run `npm run build` in `packages/core`.
  - Ensure all tests pass: `npm test`.
- [x] **Package Verification**:
  - Check `packages/core/package.json` for correct `bin`, `main`, and `files` fields.
  - Ensure `#! /usr/bin/env node` is at the top of `dist/cli.js`.
- [x] **Versioning**:
  - Decide on version (current: `0.0.1`). Use `npm version patch`.
- [x] **Publish**:
  - Run `npm publish --access public` in `packages/core`.
  - **Live Package**: [npmjs.com/package/bell-lang](https://www.npmjs.com/package/bell-lang)

## 🧩 VS Code: Bell Extension

The extension depends on the CLI being available.

- [x] **Tooling**:
  - Install `vsce`: `npm install -g @vscode/vsce`.
- [x] **Account Setup**:
  - Create/Verify a Publisher on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage).
  - Current publisher in `package.json` is `bell`.
  - **How to get a PAT**:
    1. Log in to [Azure DevOps](https://dev.azure.com/).
    2. Click the user icon (top right) -> **Personal access tokens**.
    3. Click **New Token**.
    4. Set **Organization** to `All accessible organizations`.
    5. Set **Scopes** to `Marketplace` -> `Publish` (or `Custom defined` -> `Marketplace (Publish)`).
    6. Copy the token immediately! It will not be shown again.
- [x] **Assets**:
  - Ensure `icon.png` and `icons/` are high quality and meet VS Code requirements.
  - Added `README.md` and `CHANGELOG.md` directly in `packages/vscode`.
  - Added `.vscodeignore` to prevent `vsce` from looking outside the package root.
- [x] **Packaging**:
  - Run `npm run compile` in `packages/vscode`.
  - Run `vsce package --no-dependencies` within the `packages/vscode` directory.
  - **Note**: The `--no-dependencies` flag is required in this monorepo to avoid "invalid relative path" errors caused by `vsce` following workspace symlinks.
- [x] **Publish**:
  - Run `vsce publish --no-dependencies` or upload the `.vsix` manually.

## 🚀 Post-Publish

- [ ] Update `apps/docs/docs/guide/getting-started.md` with the official installation commands once live.
- [ ] Tag the release in Git: `git tag v0.1.0 && git push --tags`.
