# Release Bell

Perform a release of `bell-lang` (core) and/or `bell-vscode` (VS Code extension) — only for packages with unreleased changes.

> **`apps/docs` is not part of this flow.** The docs site deploys automatically to GitHub Pages on every merge to `main` that touches `apps/docs/**` — no manual step needed.

## Step 1: Determine what needs releasing

Find the most recent git tag and check which packages have changed since then:

```bash
git tag --sort=-v:refname | head -1
git log <last-tag>..HEAD --oneline --name-only -- packages/core packages/vscode
```

Also show the current versions:
- `packages/core/package.json` → `version`
- `packages/vscode/package.json` → `version`

If a package has no changed files since the last tag, **skip it** — do not bump or publish it.

## Step 2: For each package that has changes, confirm the bump type

Ask the user: "core has changes — bump patch, minor, or major?" (and same for vscode if applicable). Default to `patch` unless there are new features (minor) or breaking changes (major).

## Step 3: Release `packages/core` (if needed)

Run from `packages/core/`:

```bash
npm run build
npm test
```

If tests pass, bump the version:
```bash
npm version <patch|minor|major>
```

Then publish:
```bash
npm publish --access public
```

If `npm publish` fails with an auth error, tell the user to run `! npm login` and retry.

## Step 4: Release `packages/vscode` (if needed)

Run from `packages/vscode/`:

```bash
npm run compile
vsce package --no-dependencies
```

Then publish:
```bash
vsce publish --no-dependencies
```

If `vsce publish` fails with an auth error, remind the user they need a Personal Access Token from Azure DevOps with `Marketplace → Publish` scope, and to run `! vsce login bell`.

## Step 5: Tag and push — CI handles the rest

Tag using the **core version** (the npm package drives the overall version):

```bash
git tag v<core-version>
git push --tags
```

If only vscode was released (no core changes), tag using the vscode version with a `vscode-` prefix: `git tag vscode-v<vscode-version>`.

Pushing a `v*` tag triggers `.github/workflows/release.yml`, which builds and publishes both `bell-lang` to npm and the extension to the VS Code Marketplace automatically. The manual publish steps above (Steps 3–4) are only needed if CI is unavailable or you need to publish without tagging.

## Notes

- Never publish a package just because the other one was released — each package is independent.
- The VS Code extension depends on `bell` being available via `npx` or global install, so always release core first if both need releasing.
- After publishing, the npm package is live at https://www.npmjs.com/package/bell-lang and the extension dashboard is at https://marketplace.visualstudio.com/manage/publishers/bell.
