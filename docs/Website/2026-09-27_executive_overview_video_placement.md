# Executive overview video placement — 27 September 2026

## Purpose

Give visitors the full executive overview from the homepage before a tailored demo. The message leads with a connected operating picture, then introduces ChatIQ and the AI operating layer as a way to ask about business information and move supported tasks forward.

## Placement and assets

- `index.html` uses the owner's uploaded full overview in the existing homepage video modal. The local poster remains visible until the visitor presses play; the iframe URL is then assigned. A separate action opens the uploaded 85-second cut in the same modal. Closing it removes the iframe URL to stop playback. The adjacent action leads to the focused module walkthroughs.
- `walkthroughs/index.html` embeds the same full overview before the module demo library, with a tailored-demo action nearby.
- Both embeds use YouTube's privacy-enhanced `youtube-nocookie.com` domain. The full video ID is `hxrmPeENdM4`; the short video ID is `iEeSQhziNRE`. Direct YouTube links are visible beside the players if embedded playback is unavailable.
- `assets/videos/flowiq-connected-operations-overview-poster.jpg` is the shared preview image.
- Canonical full and short MP4s, editable sources and the WhatsApp cut remain in `docs/General/ExecutivePresentations/`. The previously copied local site MP4s were removed because the pages now use the uploaded YouTube video.

## YouTube handoff

The owner supplied `https://youtu.be/hxrmPeENdM4` and `https://youtu.be/iEeSQhziNRE`. Their watch pages displayed the full FlowIQ connected operations overview and the 1:24 short overview respectively. This source update places the full video on both pages and makes the short upload available from the homepage and walkthrough page. No YouTube upload or website deployment was run by Codex.

## Claims and checks

AI copy describes natural-language business enquiries, source context and supported in-app task actions. ChatGPT and Claude are described as permission-controlled enquiry connections. The video frames voice notes as an interaction direction; the website does not claim a released voice-note input. Module and AI access depend on organisation configuration and permissions. JobIQ is described as ready to demonstrate.

The homepage was previewed locally: both video choices opened the modal with the matching YouTube link, and closing it removed the iframe URL. The full overview section and module library anchor loaded. The inline page scripts passed syntax checks. The in-app browser rendered YouTube iframes blank on localhost for both standard and privacy-enhanced domains, while the direct watch pages opened. The site iframe sends an origin through `referrerpolicy="strict-origin-when-cross-origin"`; hosted browser playback still needs checking after the owner's GitHub-driven website publication. No Netlify deployment was run.
