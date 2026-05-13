# AI Skill

Bell ships with a language reference designed to be fed directly to AI assistants so they can write correct `.bel` files.

## Download or Copy

<a href="/bell/bell-skill.md" download>Download bell-skill.md</a>

Or grab it from the CLI and pipe it wherever you need:

```bash
bell skill                # print to stdout
bell skill | pbcopy       # macOS: copy to clipboard
bell skill | xclip        # Linux: copy to clipboard
bell skill > bell-skill.md  # save to a file
```

## Install as a Claude Code Slash Command

Install the skill as a project-level [Claude Code](https://claude.ai/code) slash command:

```bash
bell skill --install
```

This writes the reference to `.claude/commands/bell.md` in your current directory. After that, type `/bell` in any Claude Code conversation in that project to load the full Bell language reference.

To install globally (available in all your Claude Code projects):

```bash
bell skill --install --global
```

## Skill Content

<<< @/../../../packages/core/src/skill/bell-skill.md
