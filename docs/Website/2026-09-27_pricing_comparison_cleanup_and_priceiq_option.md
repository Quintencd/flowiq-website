# Pricing comparison cleanup and PriceIQ add-on option — 2026-09-27

## Website change

The public `/pricing` comparison no longer shows the combined Core Operations or Commercial bundle rows. Those rows returned a dash if any one module in the group was missing, which hid which capability caused the dash. The Modules section now shows SalesIQ and PriceIQ separately using `Included` or `—` from the generated plan payload.

TimeIQ and Delivery management have been removed from this comparison. The duplicate Forecasting row and the warehouse-count proxy called Inventory intelligence were also removed. Paid optional modules now use the shorter `Add-on` label, explained once above the table with `Included` and `—`. This is a website-only presentation change; the generated pricing payload, app entitlements, and billing are unchanged.

## PriceIQ product recommendation, revised after the follow-up

Current plans already include PriceIQ and two custom price lists on Growth Lite. Growth includes PriceIQ and five lists, and already offers `extra_price_lists` at R200/month for three more lists per pack, up to two packs. Professional, Scale and Enterprise have unlimited lists. Starter Lite and Starter have neither PriceIQ nor custom price lists. Trade Portal is available from Growth Lite partly because that plan has a PriceIQ foundation; its production backend checks effective PriceIQ access.

**Selected offer:** extend the existing R200-for-three-extra-lists pack to Growth Lite with the same two-pack cap. That gives Growth Lite 2, 5 or 8 lists, while Growth keeps 5, 8 or 11. This sells extra capacity to organisations already entitled to PriceIQ without creating a second PriceIQ module entitlement or taking a benefit from current Growth Lite customers. Pro and higher need no pack because their list limit is already unlimited. The SQL and Edge billing changes are live; the app and generated website pricing are local pending GitHub publication. Release evidence is in `docs/PriceIQ/2026-09-27_growth_lite_extra_price_lists_pack.md`.

The extra-list pack does not help Starter Lite or Starter customers because those plans do not include PriceIQ. A separate PriceIQ module add-on for them remains a possible later offer. The earlier R490/month suggestion is an unvalidated product hypothesis, not the recommended immediate rollout or a live catalogue value.

Making PriceIQ optional *on Growth Lite* instead would remove a current paid-plan benefit and disrupt the Trade Portal prerequisite. That would require a grandfathering decision for current subscribers plus coordinated app, database, PayFast/Edge, pricing payload, portal and invoice pricing checks. No such change was made.

## Regression risk and release gates

- Website comparison cleanup: below 10% expected regression risk. The comparison still reads the existing generated plan data; validate rows, currency and annual toggles after the user's GitHub publication.
- Growth Lite extra-list pack: greater than 10% end-to-end release risk remains until the app and website are published and signed-in checkout/renewal/removal and PriceIQ list enforcement are verified. SQL, deployed Edge and local catalogue/payload now agree; existing Growth pack quantities and pricing are preserved.
- New Starter-tier PriceIQ sale: greater than 10% expected regression risk until entitlement, custom-list capacity, PriceIQ RPC/route, invoice price resolution, checkout/scheduled change, revocation, and cross-org tests pass together. Preserve current Starter-tier financial and stock limits.
- Removing PriceIQ from Growth Lite: greater than 10% risk to current customers and Trade Portal. The recommended offer avoids this removal.

No separate PriceIQ module key was created. The existing extra-list key and R200 price are reused for Growth Lite; see the release note above for validation and deployment status.
