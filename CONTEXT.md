# CONTEXT.md — realestateincostadelsol.com

Domain glossary for this project. Implementation details live in CLAUDE.md and roadmap.md. This file contains only resolved terminology and business concepts.

---

## Terms

### Lead
A visitor who submits the enquiry form with their name, email, and phone number. A lead is the primary business output of this site. Leads are sold to a partner agency at a per-lead price. A lead captured from a specific property page (with property ref, title, and price auto-included) is a **qualified lead** and is worth more than a generic enquiry.

### Partner Agency
The Spanish real estate agency that purchases leads from this site. Not named publicly anywhere on the site or in public files (llms.txt, footer, etc.). The relationship is disclosed only in private documentation and the Privacy Policy if legally required.

### Property Page
A statically generated Astro page for a single Resales Online API listing. URL format: `/properties/R{ref}/`. Contains: photo gallery, key stats (beds, baths, built m², price, location), description, and a lead form. One HTML file per property, generated at build time from `properties.json`.

### Proxy Endpoint
A WordPress REST API endpoint on the partner agency's server (`/wp-json/reo/v1/properties`) that relays requests to the Resales Online API using the server's whitelisted IP. Authenticated via `Authorization: Bearer` header. Returns all properties (no location filter) as a single JSON array. Pagination is handled internally by the proxy — callers receive one complete response.

### Resales Online API
The external Spanish property database (V6 API). Only accessible from IP addresses whitelisted in Resales Online's backend. The partner agency's server IP is whitelisted. Direct calls from Netlify build servers or browsers are rejected.

### Nightly Build
A Netlify build triggered nightly at 02:00 UTC via a build hook POST from cron-job.org. During the build, Astro fetches all properties from the Proxy Endpoint, generates static property pages, and deploys to Netlify's CDN. Property data is never older than 24 hours.

### Sold Banner
A client-side UI element shown on property pages for listings that have been removed since the last build. A `sold.json` file (generated at build time) lists refs no longer in the active dataset. A JS snippet checks if the current page's ref appears in that list and renders: *"This property may no longer be available — send us an enquiry and we'll find you something similar."*

### Form Handler
Web3Forms. Form submissions POST to `https://api.web3forms.com/submit` and are emailed to the site owner. Free tier: 250 submissions/month. Do NOT use Netlify Forms (100/month cap). Every enquiry form on the site uses Web3Forms.

### Qualified Lead (property page)
A form submission from a property detail page. Includes three hidden fields auto-populated from the page data: `property_ref`, `property_title`, `property_price`. Phone number is required on these forms. The resulting email gives the partner agency everything they need to follow up on a specific listing.

### Generic Lead (homepage / area pages)
A form submission from the homepage or area pages. No hidden property fields. Phone number is optional. Budget, area, property type, and bedroom count dropdowns give enough context to forward the lead.

### Cookie Consent
A lightweight client-side banner (Accept / Decline buttons, preference stored in localStorage) required for GDPR compliance. Google Analytics 4 fires only after the visitor accepts. No third-party consent library — built as a simple Astro component.

### llms.txt
A public markdown file at `/llms.txt` describing the site's purpose, structure, and content for AI crawlers and APIs. Does not name the partner agency. Describes the lead model generically: "Leads are forwarded to a partner agency for follow-up."

### WP Residence Properties
Local property listings managed inside the partner agency's WordPress site as `estate_property` custom post types. These are NOT fetched or displayed on this site. Only Resales Online API properties appear here. WP Residence properties have permalinks on the partner agency's domain and cannot be hosted here without SEO cannibalisation.
