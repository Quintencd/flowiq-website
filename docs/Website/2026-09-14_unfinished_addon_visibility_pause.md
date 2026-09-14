# Unfinished add-on visibility pause

Date: 2026-09-14

## Current state

The marketing website no longer presents Messaging Pack or Business Units as customer-ready solutions.

## Public website changes

- Removed both add-ons from pricing cards and comparison rows.
- Removed both add-ons from the generated public pricing payload.
- Removed Business Units from the module directory, module navigation, structured directory data, module catalogue source, and both sitemap copies.
- Retained the Business Units detail file for future reactivation, but marked it `noindex,nofollow,noarchive`, removed all normal public discovery paths, and added temporary redirects from both public route forms to the Modules directory.
- Removed Messaging from the legacy pricing page description.

Legal privacy and terms disclosures about authorised WhatsApp/Meta data processing remain unchanged. They are compliance boundaries, not a claim that the integration is currently available.

## Release boundary

These are source changes only. No Netlify deployment, Git push, commit, database change, billing mutation, or customer entitlement change was performed. The website becomes public only through the user's normal GitHub release workflow.

## Reactivation gate

Restore the Messaging Pack only after Meta/provider integration and hosted workflow acceptance are complete. Restore Business Units only after the customer workflow, permissions, billing, and hosted end-to-end experience are complete.

## Regression risk

No identified regression risk is above 10%. The retained noindex Business Units page avoids deleting future-ready content while removing customer discovery and search indexing signals.
