# Command Line Interface (CLI)

Bell provides a powerful command-line interface to execute scripts, convert Postman collections, and more.

## Installation

If you're using Bell as a package, you can run it via `npx`:

```bash
npx bell-lang <command>
```

## Basic Usage

Run a Bell file:

```bash
bell run example.bel
```

Or run a Bell file directly without the `run` command:

```bash
bell example.bel
```

### Inline Execution

You can also execute Bell code directly from the terminal using the `-c` flag:

```bash
bell -c 'url "https://api.example.com/data"\nGET'
```

## Commands

### `run`
Executes a `.bel` file.

```bash
bell run <file> [options]
```

**Options:**
- `-v, --verbose`: Print more details about the request and response.
- `-e, --env <environment>`: Specify an environment configuration to use.

### `convert`
Converts a Postman collection JSON file to Bell files.

```bash
bell convert <postman-json> [options]
```

**Options:**
- `-o, --output <dir>`: Output directory for the `.bel` files (default: `./bell`).

### `format`
Formats a Bell file according to the language style.

```bash
bell format <file> [options]
```

**Options:**
- `--check`: Exit with code 1 if the file would be changed, without writing.
- `--stdout`: Print formatted output to stdout instead of writing to the file.

### `init`
Creates a `bell/` folder with a starter example file to help you get started quickly.

```bash
bell init
```

### `skill`
Prints the Bell language reference for AI assistants. With `--install`, writes it to `.claude/commands/bell.md` as a Claude Code slash command.

```bash
bell skill               # print to stdout
bell skill --install     # install for Claude Code (project)
bell skill --install --global  # install for Claude Code (global)
```

### `help`
Displays help information for the commands.

```bash
bell help [command]
```

## Interactive REPL

Running `bell` without any arguments starts the interactive REPL (Read-Eval-Print Loop), where you can type Bell commands and see the results immediately.

```bash
bell
```
