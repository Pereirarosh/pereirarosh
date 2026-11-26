# Pereira & Rosh Protection Ltd

Responsive commercial site with static HTML pages, local image assets, a dependency-free Node build and an optional Vercel email function.

## Develop and deploy

- Use Node 24. Run `npm run build` to generate `dist/`, then `npm run preview` for the local static preview.
- Import the source in Vercel. The checked-in `vercel.json` configures the build, output, clean URLs and response security headers.
- Set `SITE_URL` before building if using a different canonical production origin. Verify the new origin and update Search Console and Bing after any domain change.
- The local preview serves HTML and assets. Use a Vercel deployment or Vercel Dev to exercise the enquiry function.
- See `.env.example`. Set `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL` using Vercel production environment variables to enable form submissions. Verify the sending domain in Resend and redeploy. The build requires both settings to show the Send enquiry button. Without them the form prepares a draft in the visitor’s email app. Verify inbox receipt with an authorised end-to-end test. Configure deployment-level rate limiting before switching on submission.
- Keep local environment files and credentials out of Git. The production form sends to the published business mailbox.

## Maintain content

Edit `content.mjs` for company details, category copy, FAQs and articles. Edit `build.mjs` for page layout, legal copy and metadata, and `static/assets/site.css` for design tokens and layout. The photography was generated for this site as illustrative material, and the header and footer use a custom PR shield image beside the wordmark. Manrope and Inter variable fonts and the Lucide icon paths are served locally. Their licences are in THIRD-PARTY. Replace those assets with owner-approved originals if available.

Confirm the detailed service catalogue, licence evidence, insurance and actual operating area with the business before advertising them. Verify the Companies House record and the company’s privacy handling, providers and retention periods with the owner. Review legal text before the official launch. The current deployment includes no advertising or analytics scripts. Check the provider cookie and request logs if adding third-party integrations.

See [Research and launch notes](RESEARCH.md).
