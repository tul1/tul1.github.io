# patriciotula.com

Personal portfolio and CV — **Patricio Tula**, Senior Software Engineer.

- Live: https://patriciotula.com
- Content: [`src/content/profile.ts`](src/content/profile.ts)
- CV download: `/cv.pdf` (source file in [`content/CV_PatricioTula.pdf`](content/CV_PatricioTula.pdf))

## Develop

```bash
npm install
npm run sync:cv
npm run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local server |
| `npm run sync:cv` | Copy `content/CV_PatricioTula.pdf` → `public/cv.pdf` |
| `npm run build` | Sync CV + production build |

To update the downloadable CV, replace `content/CV_PatricioTula.pdf` and run `npm run sync:cv` (or build).

## Deploy

Vercel project `patriciotula`. DNS notes: [DNS.md](DNS.md).
