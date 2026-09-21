# patriciotula.com

Tech blog by **Patricio Tula**.

- Live: https://patriciotula.com
- Posts: [`content/posts/`](content/posts/) (one Markdown file per note)

## Publish a post

Create `content/posts/my-title.md`:

```md
---
title: Title
date: 2026-09-21
excerpt: "One or two sentences."
tags:
  - go
---

Markdown body.
```

The URL slug is the filename without `.md`.

## Develop

```bash
npm install
npm run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local server |
| `npm run build` | Production build |

## Deploy

Vercel project `patriciotula`. DNS notes: [DNS.md](DNS.md).
