# BrandIQ optional conversion disclosure — local handoff

11 October 2026. Quinten requested safe local BrandIQ completion and the Google
OAuth/Biomek pilot steps, with no submission, deployment or commit.

Target verified: existing `main` checkout, `flowiq-website.git`, at
`/Users/quintenmac/dev/FreightIQ/flowiq_website`. The checkout was clean before
this change. No other website or app property was edited for marketing content.

The existing [August transparency record](2026-08-14_brandiq_google_ads_oauth_transparency.md)
and current `privacy.html`/`brandiq-google-ads.html` were reviewed alongside
targeted history (`0422c55`, `b813369`) and the app's current
`brandiqGoogleDataManager.ts` request builder. Public readback on 11 October
confirmed that the old Ads section was available, but did not explicitly explain
optional Data Manager uploads. It described Ads access/storage only.

Prepared changes explain the separate administrator permission, selected Google
destination, consent, exact current click-ID/event/value/currency payload,
absence of customer names/email/phone/full order contents, future withdrawal
behavior, Google custody, and ingestion-versus-attribution boundary. There is
no new API, tracking, consent collection, advertising action or provider setting.

Validation: `node --test tests/brandiq-google-conversion-disclosure.test.mjs`
passes 3/3, repeated after the policy-date edit. Local browser renders the new
privacy/homepage text and correct anchor; privacy has no phone-width horizontal
overflow. Every external request was blocked, including CDN styling/analytics,
so this is content/render proof, not full CDN-styled visual acceptance.
Main-app Data Manager/consent fixtures and provider tests independently
cover runtime behavior; this website test checks disclosure, not actual consent
or Google approval. Full website visual acceptance and owner/privacy review must
precede publication; public source currently does not include these additions.

Publication belongs to Quinten through the normal GitHub website process. Do not
run Netlify deployment commands. Verify the new wording on the public URLs before
using Data Manager as a production OAuth submission feature. If publication or
the genuine demonstration is not ready, choose an Ads-only review and keep the
optional feature unavailable to general customers until separately reviewed.

Recovery: withdraw only this handoff's two added paragraphs/heading block and
homepage paragraph; no data or schema recovery is needed. Preserve all prior
policy content. Owner must confirm actual consent/processor practices before
publishing a public commitment. No claim of legal or provider approval is made.
