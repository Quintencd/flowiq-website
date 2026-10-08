# Microsoft publisher-domain verification file

Date: 2026-10-08. Owner: existing Office 365/calendar connector chat. Website publication owner: Quinten. State: source prepared and locally validated; unpublished; Microsoft verification pending.

## Acceptance and verified target

The requested connector onboarding needs FlowIQ's public publisher domain to associate both existing Microsoft apps. This increment prepares only the website file and its exact URL; it does not establish Partner membership, a verified publisher badge, tenant consent, or client connector readiness.

Verified checkout: `/Users/quintenmac/dev/FreightIQ/flowiq_website`, branch `main`, remote `https://github.com/Quintencd/flowiq-website.git`. Validation baseline: `3b56b7cf34970ce44dfe602e67fbb04f347f245c`. The latest relevant routing revision is `90bb3fc`. The README's old repository name was corrected from the actual remote. Its linked `docs/website-folder-structure.md` is absent, so that historical link was not treated as target proof. Reviewed README, current routing, relevant routing history, the August privacy and canonicalization records, and current official Microsoft/Netlify documentation. No complete historical review is claimed.

Acceptance requires the exact public HTTPS verification URL to return status 200 and UTF-8 JSON containing both app IDs after Quinten publishes, followed by successful domain verification/save for each app in Entra. Local validation does not complete either external step.

## Source and validation

`microsoft-identity-association.json` is stored at the configured static publish root. It contains only the two public app IDs: company email `49556515-d687-4b6e-9319-a59fe12dae6b` and personal calendar `23ea8745-2887-49ba-9bde-5719ce1b5e99`. Its bytes match the existing provider artifact in the application repository. No credential or private tenant/user data is included.

`netlify.toml` now rewrites only `/.well-known/microsoft-identity-association.json` to that root file with status 200 before the existing forced canonical-host redirect. Both exact JSON paths receive a JSON content type and revalidation cache policy. All prior parsed redirects, headers and other configuration remain identical. No broad `.well-known` rule was added.

[Original validation receipt](2026-10-08_microsoft_publisher_domain_validation.json) records source SHA-256 fingerprints, the baseline, Python 3.11 TOML/JSON checks, local static HTTP readback, and five passing offline Netlify requests. The offline fixture used immutable candidate file copies, one placeholder pricing document, and empty function/email folders; it had no linked site or copied credentials. Command: `netlify dev --offline --no-open --framework '#static' --dir . --port 8899`.

The exact association URL served status 200, exact JSON bytes and the expected headers with both root and www Host headers. The direct JSON path passed, the existing www pricing route served its fixture, and an unrelated `.well-known` path retained a 404. The local CLI server was stopped afterward. The initial Python 3.9 invocation lacked `tomllib`; validation was rerun with existing Python 3.11.15. An initial literal charset assertion was corrected to parse the HTTP header because the emulator spells the same charset `UTF-8`; source was unchanged. These are recorded validation corrections, not product failures or skipped checks.

Local emulation does not prove the production CDN, TLS or canonical-host behavior. Read-only public fetch still returned **404** at validation time. No Netlify deployment, GitHub push, provider save, consent, or security access expansion occurred. No application, database, function or shared-mailbox implementation changed in this increment.

## Publication and recovery handoff

1. Quinten publishes this scoped website change through the existing GitHub workflow. Foreign untracked commercial/pricing documentation is outside this handoff and remains preserved.
2. The connector owner reads back `https://flowiq.info/.well-known/microsoft-identity-association.json`: exact body, status 200, JSON/UTF-8 content type, no unexpected routing, and existing representative public pages. A 404, HTML body, wrong IDs, or changed unrelated routing blocks Entra verification.
3. The connector owner resumes the existing Entra publisher-domain panel for both saved apps. Verify/save is a separate provider action; any required browser action-time approval must precede that mutation. Domain association does not substitute for Partner verified-publisher enrollment.

Recovery trigger: public association-file failure or a regression attributable to these exact routing additions. Known-good routing is `netlify.toml` at the baseline above. Recovery removes only this exact rewrite, its two headers and the new public JSON file through the normal Quinten-owned GitHub publication path, preserving other changes. No credential rotation, destructive data write or tenant deletion is required. Quinten owns website recovery; the connector owner provides readback and diagnosis. Recovery was checked structurally by removing the candidate additions from parsed TOML and obtaining the exact baseline configuration; no live rollback was executed.

## References

- [Microsoft publisher-domain configuration](https://learn.microsoft.com/en-us/entra/identity-platform/howto-configure-publisher-domain): association format, URL, supported content types and Entra verification.
- [Netlify rewrites](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/) and [custom headers](https://docs.netlify.com/manage/routing/headers/): status-200 rewrite and static-file response configuration.
- [Existing canonicalization decision](2026-08-08_search_console_indexing_canonicalization.md).
