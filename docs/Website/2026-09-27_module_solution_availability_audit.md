# Module and solution availability audit — 2026-09-27

## Scope

Compared the public modules and solutions directories with the current FlowIQ app add-on catalog and module release documentation. This is a website presentation update and audit; it does not change entitlements, billing, production data, or a deployment.

## WorkIQ correction

WorkIQ already appears in the public directory and has its own detail page, but both called it a generic `Module`. The website pricing comparison already describes `workiq_addon` availability. The directory and detail page now label WorkIQ `Add-on`, and the detail page explains its plan availability and permission boundary. The canonical billing catalog lists the optional add-on on Starter Lite, Starter, Growth Lite, and Growth; Professional, Scale, and Enterprise include WorkIQ. The WorkIQ detail page does not show a price; the current pricing page renders selected add-on prices from the generated payload.

## Directory gaps and release boundary

| Capability | Current website | Current product boundary | Recommended public treatment |
| --- | --- | --- | --- |
| JobIQ | Absent from 31-card module directory and detail pages; present in the app add-on catalog | Controlled paid add-on; provider, hosted acceptance, protected Manufacturing and linked financial-file gates remain open | Prepare a truthful page for repair/service jobs; hold general-availability language until the first-client gates close |
| BrandIQ | Absent from module directory and detail pages; present in the app add-on catalog | Provider-specific approvals and certification, OAuth and public connection gates remain open | Describe the supervised capability only, with explicit provider availability boundaries; do not offer broad activation |
| Trade Portal | Absent from module directory and detail pages; present in billing and app documentation | Backend supports a named controlled pilot; real customer end-to-end pilot and hosted recovery acceptance remain open | Prepare a preview/pilot page, then publish general availability after pilot sign-off |
| Business Units | Has a standalone module page but is absent from the 31-card directory | App catalog sets `customerVisible: false` | Keep out of self-serve activation; review product and release decision before promoting |
| Accounting reconciliation | Has a standalone module page but is absent from the 31-card directory | Advanced reconciliation is sold through the AccountingIQ/BankingIQ add-on structure | Link from AccountingIQ or BankingIQ as a capability, avoiding a duplicate module offer |
| TimeIQ | Shown as a generic available module | Controlled rollout and backend allowlist remain in place | Add an explicit controlled-availability notice before treating the site as a general launch claim |

The solutions hub currently has seven paths: importers/distributors, retail/ecommerce, multi-branch, manufacturing/assembly, wholesale distribution, freight/logistics, and RFID. It has no service/field-work solution path even though WorkIQ is already available as an add-on. A service-business path combining WorkIQ, SalesIQ, InvoiceIQ and AccountingIQ is the clearest next site addition. Repair/refurbishment can later introduce JobIQ once its release gates close. Projects-led businesses are another plausible solution path but need a focused offer and proof review before publication.

## Verification and risk

The WorkIQ change is generated from `tools/module-catalog.mjs` into the module directory and detail page. No add-on billing or permission logic changed. Regression risk is below 10% for this presentation-only correction; the main practical risk is marketing copy drifting from billing plan rules, so the website validation and current catalog should be checked together for future pricing changes. General-availability claims for JobIQ, BrandIQ, Trade Portal, and TimeIQ carry greater than 10% customer-expectation and onboarding risk while their documented launch gates remain open.
