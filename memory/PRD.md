# DCX Security Systems — Product Requirements Doc

## Original Problem Statement
Premium modern business website for **DCX Security Systems** (Home / Office / Commercial Security, Fire Safety & Surveillance) inspired by https://thinkxtechnology.com/ — dark theme with blue glow, framer-motion animations, glassmorphism cards. 7 pages, 12 products, 6 services, animated counters, gallery, testimonials, embedded map, forms, FAQ, floating WhatsApp/Call buttons.

## User Choices Captured (2026-02-05)
- Frontend-only forms (no backend persistence) — show success message
- Embedded Google Maps iframe (no API key)
- Placeholder Unsplash images for products + installations
- WhatsApp / Call number: 099717 95961 (+919971795961)
- No email notifications
- DCX brand colors: Dark Blue primary, Black secondary, White + Neon Cyan accent

## Architecture
- React 19 + React Router v7 + Tailwind CSS + Framer Motion 12
- Static site, no backend usage
- Page-level transitions via `AnimatePresence` in `App.js`
- Centralized data in `/app/frontend/src/data/site.js`
- Shadcn UI for primitives: Dialog, Accordion, Select, Input, Textarea, Label

## Persona
- Homeowners / shop owners / SME operators in Agra & nearby looking for installed security solutions
- They want trust signals, transparent pricing, easy contact, social proof

## Pages Implemented (2026-02-05)
- `/` Home — hero with parallax, stats, about, featured products, services, testimonials, FAQ, CTA
- `/about` — mission/vision, values, capabilities
- `/products` — 12 products with category filters + Enquire dialog
- `/services` — 6 services + 4-step process
- `/installations` — masonry gallery with lightbox
- `/clients` — auto-rotating slider + grid + map
- `/contact` — info card, embedded map, request form (Survey/Demo/Quote/Enquiry), FAQ

## Components
- `Navbar` (sticky, scroll-aware, mobile menu)
- `Footer` (logo, quick links, products, services, contact, social)
- `FloatingButtons` (WhatsApp + Call w/ pulse ring)
- `AnimatedCounter`, `SectionHeader`, `PageWrapper`
- `ProductCard`, `EnquiryDialog`
- Custom `Logo` (SVG shield + DCX wordmark)

## Test Coverage (iteration_1)
100% frontend pass — all 17 reviewed features verified.

## Backlog / Next Phase
**P0** — Replace Unsplash placeholders with real DCX product photography + actual installation gallery photos; add real DCX logo asset.
**P1** — Backend integration to persist form submissions (MongoDB) + email notifications (Resend / SendGrid) + admin dashboard to view leads.
**P1** — Real Google Maps API integration with multi-pin client locations on Clients page.
**P2** — Blog / case studies, downloadable brochure PDF, multi-language (Hindi).
**P2** — Quote calculator (pick products → estimated total).
**P2** — Live chat / Calendly-style booking widget.

## Known Gaps
- Some product placeholders share the same Unsplash URL (see code review notes in iteration_1)
- No real /404 page (catch-all renders Home)
- Forms are display-only (success toast, nothing stored / sent)
