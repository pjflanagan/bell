# Getting Started

Follow these steps to get Bell up and running on your machine.

## 1. Install the CLI

The Bell CLI is the core engine used to execute `.bel` files. You can install it globally via npm:

```bash
npm install -g @bell/core
```

Verify the installation:
```bash
bell --version
```

## 2. Install the VSCode Extension

To get the best experience with syntax highlighting and integrated execution, install the Bell extension from the VSCode Marketplace.

1. Open VSCode.
2. Go to the Extensions view (`Ctrl+Shift+X`).
3. Search for **"Bell"**.
4. Click **Install**.

## 3. Your First Bell File

Create a new file named `hello.bel` and add the following content:

```bel
url "https://httpbin.org/get"
param userId "12345"

GET

log response.body.user.name
```

## 4. Run it

### Via CLI
Open your terminal and run:
```bash
bell run hello.bel
```

### Via VSCode
1. Open `hello.bel`.
2. Click the **Play** button in the top-right corner of the editor.
3. The results will appear in the integrated terminal.
