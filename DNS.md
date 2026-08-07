# DNS — patriciotula.com

Domain registered at **OVH**. Nameservers stay on OVH. Apex + `www` point to Vercel.

## Active records (relevant)

| Name | Type | Value |
| --- | --- | --- |
| `@` | A | `76.76.21.21` (Vercel) |
| `www` | A | `76.76.21.21` (Vercel) |
| `@` | MX | OVH mail (`mx3` / `mx4`) — unchanged |
| `grafana`, `loki`, … | A | `5.135.141.151` (infra, unchanged) |

## Verify

```bash
dig +short patriciotula.com A
dig +short www.patriciotula.com A
# expect 76.76.21.21

curl -I https://patriciotula.com
curl -I https://www.patriciotula.com
```

`patriciotula.vercel.app` and `www` redirect to `https://patriciotula.com` via `src/proxy.ts`.
