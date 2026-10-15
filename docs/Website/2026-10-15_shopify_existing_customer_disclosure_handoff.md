# Shopify existing-customer disclosure — local handoff, 15 October 2026

Status at preparation: source prepared and locally tested; not committed, published or accepted
by Shopify. Quinten owns review, GitHub push and website publication. Do not
publish ahead of the matched connector release and its admission checks.

## Decision and scope

The first public connector route is restricted to genuinely pre-existing,
independently paying FlowIQ EcomIQ customers. EcomIQ remains paid through FlowIQ;
connecting a store does not create a new Shopify subscription. This route offers
no signup, trial, purchase or upgrade to new Shopify App Store-acquired customers.
App Review still decides whether the implementation is acceptable. This is not
a free-app claim, an off-platform billing exception granted to FlowIQ, or a
guarantee of approval.

Verified target: this separate marketing checkout, main, remote
`https://github.com/Quintencd/flowiq-website.git`, baseline
`480190127944be03a0dabf6f402aed4325954bf2`. It was clean before these changes.
Reviewed this README, the 16 July Shopify launch record, targeted Terms/Support
history and the current app eligibility/scoping decisions before editing.

Only `terms.html` section 9 and its Last Updated date, plus the Shopify card in
`support.html`, change. Historical Shopify subscriptions retain their existing
arrangements; no cancellation, migration, extra charge or billing runtime change
is performed. All other legal/provider clauses, navigation, scripts, general
pricing/signup/trials and privacy content remain unchanged. This record is not
legal enforceability advice or acceptance of an agreement.

## Source and recovery

| File | SHA-256 |
| --- | --- |
| terms.html | 931de1e5c67b37c0a0cb5eb8803f834d0fe954e2127a017fe837790ce72a84ac |
| support.html | 833f60c16c56cccdbd440d4f6ac8eec0c6135b0392e7af40c4b7ab3fdfe6f724 |
| tests/shopify-existing-customer-disclosure.test.mjs | c099cc597308a7bdfd22ea057108d196dc9a48e44234832dde2d6499aebe1502 |

Original before-images are preserved in
`evidence/2026-10-15_shopify_disclosure_before/`, not overwritten. Terms SHA-256
`4363a39e5e73e0352ebae837c2fe0f95cf444b26974b946729f94452cde5f03f`;
Support SHA-256
`0751f611ab49c402a6a841a86ef8a490659df417d28e9170d8ae9f450b1456ef`.
They and the baseline commit provide a reviewed content recovery reference.
Quinten reviews the effective-date/wording and any publication or recovery;
agents do not deploy this website through Netlify.

## Validation and limits

Node 24.19.0, command `node --test tests/shopify-existing-customer-disclosure.test.mjs`:
5 passed, 0 failed/skipped. Tests verify original hashes, mechanically reverse
only the selected edits to reproduce the exact baseline page bytes, and check
paid-existing-customer, acquisition and approval disclosures. No new form,
credential request or purchase link is introduced by the changed paragraphs.

Local Python static preview was bound only to 127.0.0.1. Terms and Support render;
desktop screenshots show readable updated paragraphs without overlap. At actual
DOM viewport 390×844 the Terms paragraph stays within the document width (left
40.746, right 349.254, document width 390), but mobile screenshot capture returned
blank. Therefore mobile visual acceptance remains unverified; DOM bounds alone
are not a mobile visual pass. The temporary viewport override was reset.

No configured general lint/build suite exists in this static package. No hosted
readback of these edits, legal approval, provider acceptance or backend behavior
is established by these source tests. The public pages still have the old copy.

Staged whitespace inspection reports the pre-existing two-space blank line19
in the exact original Terms before-image. It is deliberately not rewritten:
the retained file must preserve its verified baseline hash. Whitespace checks
for every other selected source/test/doc path pass. This evidence-only exception
is not a waiver for changed runtime or disclosure text.

## Remaining acceptance / owners

1. Root: finish mobile visual verification or retain the explicit limitation;
   qualify the actual connector release/recovery and reviewer workflow in the
   existing EcomIQ task, without transferring implementation into this website.
2. Root: align saved listing, reviewer fixture, media and actual form limits;
   no unsupported feature or free-access claims.
3. Quinten: review date/wording and push/publish only the admitted website scope.
4. Root: verify public Terms/Support against these exact sources after that
   publication; submit only after all owning Shopify release gates pass.

Owning app record:
`/Users/quintenmac/dev/FreightIQ/docs/EcomIQ/shopify-app-store/2026-10-11_approved_submission_access_and_policy_recheck.md`.
Current draft:
`2026-10-15_existing_customer_submission_pack_draft.md` in that folder.

General policy context, not FlowIQ-specific acceptance:
[Shopify staff clarification](https://community.shopify.dev/t/does-a-split-billing-model-satisfy-1-2-1-shopify-origin-installs-billing-api-pre-existing-platform-customers-direct-billing/36909/2),
[App Store requirements](https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements).
