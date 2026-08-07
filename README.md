# patriciotula.com

Personal portfolio and CV — **Patricio Tula**, Senior Software Engineer.

- Live: https://patriciotula.com
- Content: [`src/content/profile.ts`](src/content/profile.ts)
- CV: `/cv.pdf` (generated from the same content)

## Develop

```bash
npm install
npm run generate:cv
npm run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local server |
| `npm run generate:cv` | Write `public/cv.pdf` |
| `npm run build` | Generate CV + production build |

## Deploy

Vercel project `patriciotula`. DNS notes: [DNS.md](DNS.md).
