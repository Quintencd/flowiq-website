# ReportsIQ included on every subscription tier

The approved policy makes ReportsIQ standard on all seven normal subscription
plans, including Starter Lite. The website consumes the generated
`pricing-data.json`; its Starter Lite feature list now includes `reportsiq`.
The local pricing comparison renders Included in all seven ReportsIQ columns.

The source of truth is `src/config/subscriptionPlans.js` in the separate
`Quintencd/flowiq-app` checkout. Run its existing `npm run sync:pricing` generator
to refresh both app and website snapshots. The website repository is
`Quintencd/flowiq-website`, on main. Existing pricing-page and commercial-module
work from the BankingIQ owner was preserved; this task changes no pricing-page
markup, prices, checkout or billing behaviour.

Local browser read: `http://127.0.0.1:5201/pricing.html`, reports Included across
all seven tiers. Localhost website analytics returned HTTP 400 independently;
the report row rendered correctly. No website deployment or push was performed
by this chat. Publication and hosted pricing verification remain Quinten-owned.

The application database migration remains separately approval-gated; website
inclusion alone does not enable ReportsIQ for Wesbea. Individual user permissions
remain in place. The application handoff is
`docs/ReportsIQ/2026-10-06_standard_all_subscription_plans.md` in flowiq-app.
