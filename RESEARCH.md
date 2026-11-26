# Research and launch notes

## Business evidence

The [Companies House entry](https://find-and-update.company-information.service.gov.uk/company/17588322) confirms the company name, number 17588322, Feltham registered office and SIC codes 80100 (private security activities), 81100 (combined facilities support activities) and 82990 (other business support). The official record was retrieved and checked directly. Phone and email came from the business brief.

Specific services, sector contracts, geographical coverage, insurance and accreditations remain unverified. The published site invites enquiries for the three broad categories. Customers can specify a postcode and requirements. There are no claims of 24-hour availability or SIA approval. See [SIA licensing guidance](https://www.gov.uk/guidance/find-out-if-you-need-an-sia-licence) and [the Approved Contractor Scheme](https://www.gov.uk/guidance/learn-about-our-approved-contractor-scheme). Public site includes the company disclosures described by [GOV.UK](https://www.gov.uk/running-a-limited-company/signs-stationery-and-promotional-material). Owner should confirm the privacy text against [ICO guidance](https://ico.org.uk/for-organisations/advice-for-small-organisations/privacy-notices-and-cookies/how-to-write-a-privacy-notice-and-what-goes-in-it), including retention periods, providers and international transfers.

## UK competitor benchmark

Public homepage and service-navigation review. The benchmark did not measure competitors' mobile performance or test their enquiry forms.

| Provider | Observed content and navigation | Application to this project |
| --- | --- | --- |
| [Securitas UK](https://www.securitas.uk.com/) | Service-led homepage with industry navigation and a prominent contact route. | Show category links and a quote action in the first screen. |
| [Mitie](https://www.mitie.com/) | Separates facilities management, compliance and transformation in the service navigation. | Explain where facilities responsibilities overlap before quoting. |
| [OCS](https://ocs.com/uk/) | Offers distinct facilities management and security service paths in a broad menu. | Keep service pages easy to find through the overview. |
| [Bidvest Noonan](https://bidvestnoonan.com/) | Groups facilities and security services under distinct areas and repeats its contact link. | Pair service-specific CTAs with a common enquiry journey. |
| [Carlisle Support Services](https://www.carlislesupportservices.com/) | Service and sector navigation accommodates a wide offering. | Use a short header and expand the sitemap when services are confirmed. |
| [Kingdom](https://www.kingdom.co.uk/) | Divides security and other service groups in its navigation. | Use descriptive names and short introductions on category pages. |
| [Wilson James](https://wilsonjames.co.uk/) | Pairs service categories with an industries menu and contact route. | Ask visitors which environment and responsibilities they need to discuss. |
| [Corps Security](https://www.corpssecurity.co.uk/) | Highlights specialist pillars and uses press announcements to document partnerships. | Obtain approved, attributable evidence before adding proof sections. |
| [Ward Security](https://ward-security.co.uk/) | Prioritises personnel, mobile and remote service routes. The [personnel page](https://ward-security.co.uk/services/security-personnel/) describes premises contexts. | Include practical prompts for understanding the site before discussing cover. |
| [CIS Security](https://www.cis-security.co.uk/) | Direct site could not be retrieved. The [SIA contractor record](https://www.services.sia.homeoffice.gov.uk/Pages/acs-roac.aspx?contractor=CISELISC03) provides registration evidence and refers to its front-of-house operation. | Link to verifiable credential sources when the business provides its own evidence. |

A compact navigation suits a three-category site. A short enquiry checklist and service-specific FAQs answer questions before users share details. The [Secuby template](https://secuby.framer.website/) informed the split hero, category strip and sequence of image-led sections. The ivory and evergreen treatment, architectural photography, page composition and type are original to this build.

## Search intent

| Page | Primary intent and phrasing |
| --- | --- |
| / | Security and facilities support, Feltham business |
| /services | Overview of private security, facilities and business support |
| /services/private-security | Preparing an enquiry for commercial private security |
| /services/facilities-support | Discussing facilities support for commercial premises |
| /services/business-support | Business operational support enquiry |
| /about | Branded company lookup and registered office |
| /insights | Guides for premises managers |
| /insights/security-brief | Creating a commercial security brief |
| /insights/facilities-brief | Creating a facilities support brief |
| /contact | Phone, email and registered office |
| /request-a-quote | Preparing a quote enquiry |

The site follows [Google Search Essentials](https://developers.google.com/search/docs/essentials) and [Google’s people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). The sitemap excludes the custom 404. Canonicals default to the Vercel production URL and can be changed with SITE_URL. JSON-LD describes the organisation, its three categories and navigation. The registered office is disclosed without assuming it is a customer walk-in location. Confirm eligible operating hours and service geography before configuring Google Business Profile or directory listings. Verify ownership when submitting sitemaps to Google Search Console and Bing Webmaster Tools.


## Verification

The [public production site](https://prprotec.vercel.app/) served the 16 listed pages and their referenced assets. Its sitemap and robots.txt returned HTTP 200, and an unknown URL returned the branded 404 with HTTP status 404. The production Vercel project is connected to the private GitHub source repository.

The local mobile Lighthouse lab audit on the production build measured Performance 98, Accessibility 100, Best Practices 100 and SEO 100. Simulated Largest Contentful Paint was 2.3 seconds and Cumulative Layout Shift was 0. The public URL did not load in the audit Chromium session, so these are lab scores from the local production build. The published desktop and mobile layouts were inspected separately in Chrome. Field Core Web Vitals were not measured.

The quote form runs in email-draft mode. Server-side validation and the unconfigured response were tested without sending mail. Production inbox delivery requires a verified Resend sender, environment configuration and an end-to-end test.

## Guardvex-inspired visual redesign

The supplied Guardvex screenshot and HTML were reviewed for composition, type scale, spacing and section order. The production site uses original bright styling, locally hosted Manrope and Inter, Lucide icons, a custom PR image mark and 21 new illustrative photographs. The redesign adds a dedicated coverage page, a broader service overview, premises examples and expanded category detail pages without making new unverified coverage or offering claims. All three categories retain their original quote form values and route paths.
