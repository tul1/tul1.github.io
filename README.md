# patriciotula.com

Personal portfolio and CV for **Patricio Tula** — Senior Software Engineer.

Built with Next.js, TypeScript, and Tailwind. Content lives in [`src/content/profile.ts`](src/content/profile.ts). The downloadable CV at `/cv.pdf` is generated from the same data.

## Develop

```bash
npm install
npm run generate:cv
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run generate:cv` | Write `public/cv.pdf` from `profile.ts` |
| `npm run build` | Generate CV + production build |
| `npm run start` | Serve production build |

## Deploy

Connected to Vercel. Production domain: `patriciotula.com` (DNS at OVH — see [DNS.md](DNS.md)).

## Edit content

Update [`src/content/profile.ts`](src/content/profile.ts), then run `npm run generate:cv` (or `npm run build`) so the PDF stays in sync.
