# Publishing TODOs

Steps to publish Bell components to NPM and the VS Code Marketplace.

## 📦 NPM: bell-lang

The core engine and CLI needs to be published first.

- [x] **Account Setup**: 
  - Ensure access to an npm account.
  - Run `npm login`.
  - **Note**: Package renamed to `bell-lang` (was bell-cli/core).
- [ ] **Final Build & Test**:
  - Run `npm run build` in `packages/core`.
  - Ensure all tests pass: `npm test`.
- [x] **Package Verification**:
  - Check `packages/core/package.json` for correct `bin`, `main`, and `files` fields.
  - Ensure `#! /usr/bin/env node` is at the top of `dist/cli.js`.
- [x] **Versioning**:
  - Decide on version (current: `0.0.1`). Use `npm version patch`.
- [x] **Publish**:
  - Run `npm publish --access public` in `packages/core`.

## 🧩 VS Code: Bell Extension

The extension depends on the CLI being available.

- [ ] **Tooling**:
  - Install `vsce`: `npm install -g @vscode/vsce`.
- [ ] **Account Setup**:
  - Create/Verify a Publisher on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage).
  - Current publisher in `package.json` is `pjflanagan`.
  - Get a Personal Access Token (PAT) from Azure DevOps.
- [ ] **Assets**:
  - Ensure `icon.png` and `icons/` are high quality and meet VS Code requirements.
  - Update `README.md` and `CHANGELOG.md` in `packages/vscode`.
- [ ] **Packaging**:
  - Run `vsce package` in `packages/vscode`.
  - Test the resulting `.vsix` file locally.
- [ ] **Publish**:
  - Run `vsce publish` or upload the `.vsix` manually to the marketplace dashboard.

## 🚀 Post-Publish

- [ ] Update `apps/docs/docs/guide/getting-started.md` with the official installation commands once live.
- [ ] Tag the release in Git: `git tag v0.1.0 && git push --tags`.
