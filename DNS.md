# DNS setup for patriciotula.com (OVH → Vercel)

The domain `patriciotula.com` is registered at OVH. Name servers stay on OVH (`dns105.ovh.net` / `ns105.ovh.net`). Only the zone records change so traffic reaches Vercel.

## Records to set in OVH DNS zone

1. **Remove** the old apex A record:
   - `@` → `5.135.141.151` (legacy server)

2. **Add** apex for Vercel:
   - Type: `A`
   - Name: `@` (or blank)
   - Target: `76.76.21.21`
   - TTL: default / 300

3. **Add / update** www:
   - Type: `CNAME`
   - Name: `www`
   - Target: `cname.vercel-dns.com.`
   - TTL: default / 300

4. **Do not change** OVH mail records (`MX` for `mx3.mail.ovh.net` / `mx4.mail.ovh.net`) unless you intentionally move email.

## After DNS propagates

1. In the Vercel project → **Settings → Domains**, add:
   - `patriciotula.com`
   - `www.patriciotula.com`
2. Wait until both show **Valid** and SSL is issued.
3. Verify:
   ```bash
   dig +short patriciotula.com A
   # expect 76.76.21.21
   dig +short www.patriciotula.com CNAME
   # expect cname.vercel-dns.com.
   curl -I https://patriciotula.com
   ```

## Notes

- Propagation can take a few minutes to a few hours.
- If Vercel shows different recommended IPs for your project, prefer the values shown in the Domains UI.
