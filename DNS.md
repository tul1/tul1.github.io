# DNS setup for patriciotula.com (OVH → Vercel)

The domain `patriciotula.com` is registered at OVH. Keep OVH nameservers (`dns105.ovh.net` / `ns105.ovh.net`) and only change zone records so traffic reaches Vercel.

Vercel project: `legalops/patriciotula`  
Aliases already live: https://patriciotula.vercel.app

## Records to set in OVH DNS zone

From Vercel Domains UI / CLI (current recommendation):

1. **Remove** the old apex A record:
   - `@` → `5.135.141.151` (legacy server)

2. **Apex** `patriciotula.com`:
   - Type: `A`
   - Name: `@` (or blank)
   - Target: `76.76.21.21`
   - TTL: 300 (or default)

3. **www** `www.patriciotula.com`:
   - Type: `A`
   - Name: `www`
   - Target: `76.76.21.21`
   - TTL: 300 (or default)

   Alternative (also valid on many OVH setups): `CNAME www → cname.vercel-dns.com.` — use whichever Vercel shows as Verified for your project.

4. **Leave mail alone** — do not change OVH `MX` records (`mx3.mail.ovh.net` / `mx4.mail.ovh.net`) unless you intentionally move email.

## After DNS propagates

1. Open Vercel → Project **patriciotula** → **Settings → Domains**.
2. Wait until `patriciotula.com` and `www.patriciotula.com` show **Valid** and SSL is issued.
3. Verify:

```bash
dig +short patriciotula.com A
# expect 76.76.21.21

dig +short www.patriciotula.com A
# expect 76.76.21.21

curl -I https://patriciotula.com
curl -I https://www.patriciotula.com
```

## Notes

- Propagation can take minutes to a few hours.
- You will get an email from Vercel when verification completes.
- Do **not** switch nameservers to `ns1.vercel-dns.com` unless you want Vercel to fully manage DNS (mail would need reconfiguration).
