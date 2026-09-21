---
title: Skills for writing Go with Claude
date: 2026-09-21
excerpt: "What an Agent Skill is, how Claude loads it, and where to get Go-specific ones — GitHub, skills.sh, and why Hugging Face is a different shelf."
tags:
  - go
  - claude
  - skills
---

I write a lot of Go, and I have been using Claude as a pair. The model already knows the language. What it does not know is *how I want the work done*: error wrapping, `context.Context` through the stack, tests that fail for the right reason, `golangci-lint` instead of a random set of nits.

That gap is what a **skill** is for.

## What a skill is

A skill is a small folder of instructions the agent can load when the task matches. The Agent Skills standard is just a directory with a `SKILL.md`: YAML frontmatter so the agent knows *when* to use it, and markdown so it knows *what to do*. Optional `references/`, scripts, and configs sit next to that file and stay off the context window until they are needed.

```md
---
name: golang-error-handling
description: Go error wrapping, sentinels, and panic recovery. Use when writing or reviewing error paths in Go.
---

Prefer fmt.Errorf with %w. Check with errors.Is / errors.As.
Do not panic in library code.
```

That is the whole idea. Not a plugin that patches the model. Not a fine-tune. Procedural knowledge on disk, loaded on demand.

Without a skill, Claude improvises from training data. With one, it follows a checklist you (or someone who writes a lot of Go) already paid for. The official Claude Code docs put it simply: if you keep pasting the same procedure into chat, it belongs in a skill.

## How to use it with Claude

In [Claude Code](https://code.claude.com/docs/en/skills), skills live in a few places. Where you put them decides who sees them:

| Location | Path | Scope |
| --- | --- | --- |
| Personal | `~/.claude/skills/<name>/SKILL.md` | Every project on your machine |
| Project | `.claude/skills/<name>/SKILL.md` | This repo, shareable with the team |
| Plugin | a marketplace plugin's `skills/` | Wherever that plugin is enabled |

Claude sees the **name** and **description** up front. The body of `SKILL.md` is read only when the skill fires. Two ways to fire it:

1. **Automatically.** You ask for something that matches the description — "wrap these errors properly", "add a table test for this package" — and Claude loads the skill.
2. **Explicitly.** You type `/skill-name` in Claude Code. Same as a slash command. Custom commands and skills have been merged; `.claude/skills/deploy/SKILL.md` is `/deploy`.

A useful pattern for Go is an orchestrator skill plus focused ones. [samber/cc-skills-golang](https://github.com/samber/cc-skills-golang) ships `golang-how-to` for that: on a Go task it decides whether you need `golang-grpc` plus testing, or `golang-troubleshooting` plus safety, instead of dumping every guideline into context.

You can also write a tiny personal skill. If you always want `errgroup` with a derived context, or you never want a helper package called `utils`, put that in `~/.claude/skills/` and stop repeating it.

On claude.ai the same format applies: zip the skill folder and upload it under Customize → Skills.

## Where to download them

Skills are files. Anyone can host them. The useful question is which hosts actually have **Go writing** skills, and which hosts are a general catalog.

### GitHub (the one I would start with)

For writing Go, the pack I keep coming back to is **[samber/cc-skills-golang](https://github.com/samber/cc-skills-golang)**. It is Go-only: style, naming, errors, safety, testing, concurrency, `context`, databases, gRPC, observability, performance. There is a second, smaller collection at [jkeddari/go-skills](https://github.com/jkeddari/go-skills) if you prefer fewer, broader skills.

Install the samber pack with the skills CLI (works with Claude Code, Cursor, Codex, Gemini, and similar):

```bash
npx skills add https://github.com/samber/cc-skills-golang --all
```

Or one skill:

```bash
npx skills add https://github.com/samber/cc-skills-golang --skill golang-performance
```

In Claude Code you can also add it as a plugin:

```text
/plugin marketplace add samber/cc
/plugin install cc-skills-golang@samber
```

Anthropic's own examples live at [github.com/anthropics/skills](https://github.com/anthropics/skills) (`/plugin marketplace add anthropics/skills`). Those are documents, design, and generic workflows, not a Go style guide. Still worth knowing the repo exists — it is the reference implementation of the format.

### skills.sh

[skills.sh](https://skills.sh) is the public directory for the same ecosystem. Search, copy an install line, done:

```bash
npx skills add samber/cc-skills-golang
```

This is the least magical option: a leaderboard of skills, GitHub underneath, one command to drop `SKILL.md` files where your agent already looks.

### Hugging Face

Hugging Face **does** ship Agent Skills, and they work with Claude. That is not the same as "Hugging Face is where Go skills live."

Their catalog is for **Hub / ML work**: `hf-cli` (download and upload models, datasets, Spaces, jobs), dataset browsing, trainers, evals, Gradio. Docs: [Skills on the Hub](https://huggingface.co/docs/hub/en/agents-skills). GitHub: [huggingface/skills](https://github.com/huggingface/skills).

```text
/plugin marketplace add huggingface/skills
/plugin install hf-cli@huggingface/skills
```

After `hf-cli` is in, more Hub skills install with:

```bash
hf skills add <skill-name>
```

So: use Hugging Face when the agent needs the Hub. Use GitHub / skills.sh when the agent needs to write idiomatic Go. You can host your own `SKILL.md` on the Hub like any other repo, but I have not found a Go-writing pack there that replaces samber's.

### Just clone it

If you do not want a CLI in the middle, copy the skill directory into place:

```bash
mkdir -p ~/.claude/skills
# copy each skill folder so SKILL.md, references/, and scripts/ stay together
```

Claude Code watches the skills directories; a new file shows up without a restart.

## What I am taking from this

A skill is not "make Claude better at Go" in the abstract. It is a on-disk playbook: when this kind of change shows up, follow these rules, load these references, run these commands.

For Go, I would install a real Go pack from GitHub (or skills.sh), keep a couple of personal skills for house rules, and treat Hugging Face as the Hub toolbox rather than the language toolbox.

Next I want to try `golang-how-to` on a small service and see which skills it actually pulls in. That is the part worth writing down.
