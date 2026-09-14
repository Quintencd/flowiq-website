# Weekly growth audit — 14 September 2026

## Approved application to main

The user approved proceeding on 14 September 2026. The three reviewed fixes, tests, this report, changelog and inspected screenshots have been applied to the canonical marketing checkout on `main`. The two code files and changelog were verified to match the reviewed base before transfer. No commit, push or deployment is included; the user performs the GitHub release. Mobile form containment and accepted-demo measurement remain separate follow-up work.

Verification on canonical main: all 10 tests, both changed-JS syntax checks, the 32-module validator and `git diff --check` passed. All seven transferred files were byte-verified against the reviewed worktree.

## Original audit scope

Three contained improvements are ready for review in `/Users/quintenmac/.codex/worktrees/0f9e/flowiq_website`. Verified the canonical marketing checkout at `/Users/quintenmac/dev/FreightIQ/flowiq_website`; both checkouts started at `e2a335138dbbe1a53c44fd78ac9eaf278b7fd020`. Only the automation worktree was edited. No new branch, commit, push, deployment, database write, public lead, signup or outreach occurred. The user must approve the patch before a live release through GitHub.

Read the README, previous automation notes, August 31 and September 7 repair docs, relevant growth docs, current homepage/pricing/module directory and Business Units route, solution hub/importer page, use-case/tools/comparison hubs, landed-cost calculator, signup redirect and actual signup implementation, demo questionnaire, shared navigation, analytics bootstrap/runtimes, public-lead handler, sitemap and robots. This is a representative code/content and focused browser audit, not an exhaustive accessibility certification or a live funnel acceptance test.

## Prioritized findings

| Priority | Finding and business relevance | Decision |
| --- | --- | --- |
| 1 | Demo request submits are counted before backend acceptance by both tracking runtimes. Counts cannot establish received qualified leads or booking success. | Next coordinated measurement repair; retain existing semantics this cycle. Requires an acceptance signal from public-lead, deduplication and reporting alignment, including error/redirect cases. |
| 2 | Growth analytics only initializes on DOMContentLoaded, although the root analytics bootstrap dynamically loads it. Late arrival silently loses CTA, scroll, video and form instrumentation. Duplicate script loads also duplicate listeners. | Fixed with ready-state-aware initialization and one runtime guard. |
| 3 | Empty module selection immediately displays an error on the demo questionnaire. This creates avoidable friction before a visitor has attempted the form. | Fixed; require a submit attempt before displaying the error, preserve correction behavior and qualification. |
| 4 | Calculator/lead form submission emits calculator_use even though no calculation necessarily occurred. | Fixed; emit lead_form_attempt to GA4/dataLayer, retaining canonical web_calculator_use for Calculate actions. This is an attempt, not accepted delivery. |
| 5 | At 375px, demo form cards/text visibly clip at the right edge. Document scrollWidth passes because overflow is hidden; that does not establish that all controls fit. | Existing layout issue, seen in the inspected mobile capture. Prioritize a dedicated form containment fix next cycle with element bounds checks. No layout/CSS changed here. |
| 6 | Homepage metadata remains older than its current ERP positioning, and shared WebSite schema advertises a glossary SearchAction without a real search endpoint. | SEO backlog; earlier automation proposals are not necessarily merged. Avoid duplicating pending releases. |
| 7 | Tailwind runtime CDN and unpinned Lucide add third-party and rendering dependencies across representative routes. Long demo qualification form may create mobile abandonment. | Performance/funnel risks, not measured speed or abandonment claims. Need field metrics and qualified-session evidence before changing bundles or questionnaire scope. |

Trust: prior Business Units route/image inclusion and calculator claim corrections are present in source and pass validation. Shared navigation connects solutions, modules, walkthroughs, tools, pricing and trial signup. Research hubs offer demo paths. No new claims, prices, customer logos, testimonials or promises were introduced. Hosted availability was not verified in this run.

## Three implemented changes and files

1. `assets/growth-analytics.js`: initialize during interactive/complete states immediately, wait once during loading, and ignore duplicate script evaluations. Restores tracking coverage on late-loaded pages and prevents duplicate listeners.
2. `assets/js/demo-fit-questionnaire.js`: show module-selection errors only after submission is attempted. Empty module sets still block submission and focus the first choice; selecting a module clears the error. Referral preselection, hidden values and qualification rules remain intact.
3. `assets/growth-analytics.js`: distinguish generic calculator/lead-form attempts from calculations. No submitted field values are included. Demo/contact/signup branches are preserved; demo reporting remains attempt-level.

Supporting files: `tests/weekly-growth-2026-09-14.test.mjs`, this report, `CHANGELOG.md`, and `docs/Website/weekly-growth-audit-captures/2026-09-14/demo-modules-{1280,375}.png`.

No URLs, canonical tags or page content were edited. The demo page has no existing sitemap entry to refresh. All three SEO file pairs remain identical. The small JS changes do not justify extracting or restructuring the shared runtime this cycle; a broad split would add loading-order risk without helping these fixes.

## Current production evidence

Read-only PostgreSQL aggregate query at **2026-09-14 07:11:31 UTC**, from **2026-09-07 07:07:14.850 UTC**. Filter: website organisation `00000000-0000-0000-0000-000000000000`, production environment, `web_%` events. Connection used the existing environment without exposing credentials; transaction was read-only with bounded connection/query timeouts.

| Event | Count | Distinct session IDs within event |
| --- | ---: | ---: |
| Module engagement | 386 | 29 |
| Page view | 268 | 130 |
| Scroll depth | 60 | 22 |
| CTA click | 49 | 40 |
| Video engagement | 28 | 4 |
| Pricing view | 5 | 5 |
| Demo start | 1 | 1 |
| Signup complete | 1 | 1 |
| Signup error | 1 | 1 |
| Signup start | 1 | 1 |

No demo-submit or calculator-use event was returned. These are raw counts and may include returning users or automation; they are not unique prospects, attributed acquisition or proof of delivered leads. Differences from prior weeks cannot establish uplift, especially with recent signup telemetry deduplication.

Data gaps: no GSC query/indexing export, GA4 report/export, Clarity or Smartlook recording export, keyword rankings, filtered acquisition cohort, field Core Web Vitals, CDN logs or accepted-demo delivery evidence. Installed tracking IDs are not access to those reports. No current conversion-rate or search-ranking claim is made.

## Validation and limits

- `node --test tests/*.test.mjs`: 10 passed, including existing route/signup checks and four new behavioral tests. Loading/interactive/complete initialization, duplicate evaluation, calculation versus lead attempt, module validation and qualification were checked.
- Syntax checks passed for both changed JS files.
- `npm run validate:modules`: 32 module pages, assets, links, JSON-LD and sitemap parity passed.
- 105 unique sitemap URLs resolve to local files; root/public sitemap, index and robots parity passed. Ten JSON-LD blocks parsed across representative pages.
- Five local HTTP 200 smokes: homepage, demo, landed-cost calculator and both changed scripts.
- Chrome at 1280px and 375px: initial error hidden, empty submission blocked, visible choice label clears error. No JavaScript page errors. Screenshots inspected; existing mobile clipping is explicitly recorded above.
- Calculator inputs 50,000 + 8,000 + 4,000 divided by 1,000 returned R62.00, with exactly one canonical calculator-use event even after a synthetic lead-form attempt.
- Browser production analytics and form delivery were blocked; backend acceptance and actual email delivery were not tested. External styling/fonts were permitted for rendering.
- `git diff --check` passed; final scoped diff reviewed. Existing large signup and navigation files were not refactored.

## Regression risks above 10%

Planning estimates, not measured probabilities: **15–25% reporting-comparability risk**. Restoring missing listeners may increase recorded engagement, while removing false calculator uses reduces that metric. Annotate the eventual release date and compare unique sessions and event triggers, not raw pre/post totals. Lifecycle and event-count tests reduce duplicate/missing-event risk. No evidence supports a residual functional regression estimate above 10% for these small changes; that is not a zero-risk guarantee.

## Next recommended experiment

First fix mobile form containment and establish one backend-accepted demo signal. Then measure form starts, validation attempts and accepted requests by device. Once at least 30 genuine calculator-completion sessions are available, test one result-adjacent demo invitation against the current CTA, judging qualified accepted requests rather than clicks. Release and observation are still pending user approval.
