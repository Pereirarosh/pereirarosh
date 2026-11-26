import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { company as c, services, faqs, articles } from './content.mjs';
import { imagery, settings, process as enquirySteps, planning, detail } from './editorial-content.mjs';

const origin = (process.env.SITE_URL || 'https://prprotec.vercel.app').replace(/\/$/, '');
const quote = '/request-a-quote';
const webEnquiries = Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM_EMAIL);
const email = 'mailto:' + c.email;
const tel = 'tel:' + c.tel;
const menus = [['Services','/services'],['About','/about'],['Coverage','/coverage'],['Insights','/insights'],['Contact','/contact']];
const pages = new Map();
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const add = (path, title, description, main, image = 'hero', type) => pages.set(path, {title, description, main, image, type});
const lucide = JSON.parse(await readFile(new URL('./lucide-icons.json', import.meta.url), 'utf8'));
const icon = name => lucide[name === 'shield' ? 'shield-check' : name === 'building' ? 'building-2' : name];
const arrow = icon('arrow-up-right');
const button = (label, path, style = '', showArrow = true) => `<a class="btn ${style}" href="${path}">${label}${showArrow ? arrow : ''}</a>`;
const link = (label, path) => `<a class="textlink" href="${path}">${label} ${arrow}</a>`;
const eyebrow = label => `<p class="eyebrow">${label}</p>`;
const image = (name, alt, options = {}) => {
  const hero = name === 'entrance';
  const attrs = options.priority ? 'fetchpriority="high"' : 'loading="lazy"';
  const img = `<img src="/assets/${name}.webp" alt="${esc(alt)}" width="${hero ? 1600 : 720}" height="${hero ? 1067 : 540}" ${attrs} decoding="async">`;
  return hero ? `<picture><source media="(max-width: 600px)" srcset="/assets/entrance-small.webp">${img}</picture>` : img;
};
const section = (content, cls = '') => `<section class="section ${cls}"><div class="wrap">${content}</div></section>`;
const crumb = (title, parent) => `<nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>${parent ? `<a href="${parent[1]}">${parent[0]}</a><span aria-hidden="true">/</span>` : ''}<span aria-current="page">${title}</span></nav>`;
const inner = (label, title, copy, parent) => `<section class="inner-hero"><div class="wrap">${crumb(title, parent)}${eyebrow(label)}<h1>${title}</h1><p>${copy}</p></div></section>`;
const serviceURL = s => '/services/' + s.path;
const faqList = list => list.map(([question, answer]) => `<details class="faq"><summary>${question}</summary><p>${answer}</p></details>`).join('');
const iconTile = name => `<span class="icon-tile">${icon(name)}</span>`;
const photo = (name, options) => image(name, imagery[name], options);
const titleBlock = (label, heading, copy = '', mode = '') => `<div class="section-heading ${mode}">${eyebrow(label)}<h2>${heading}</h2>${copy ? `<p>${copy}</p>` : ''}</div>`;
const headingRow = (label, heading, copy, action = '') => `<div class="heading-row">${titleBlock(label,heading,copy)}${action}</div>`;
const wideHero = (label, heading, copy, photoName, actions, breadcrumbs = '', extra = '') => `<section class="photo-hero ${breadcrumbs ? 'sub-hero' : ''}">
  <div class="photo-hero-media">${photo(photoName,{priority:true})}</div>
  <div class="wrap photo-hero-inner">${breadcrumbs}<div class="photo-hero-copy">${eyebrow(label)}<h1>${heading}</h1><p>${copy}</p><div class="hero-actions">${actions}</div></div>${extra}</div>
</section>`;
const contactActions = (path = quote) => button('Request a quote',path) + button('Call ' + c.phone,tel,'btn-ghost',false);
const tabs = `<nav class="service-strip" aria-label="Explore support"><div class="wrap">${services.map(s=>`<a href="${serviceURL(s)}">${icon(s.icon)}${s.title}</a>`).join('')}<a href="/coverage">${icon('map-pin')}Check coverage</a></div></nav>`;
const tile = s => {
  const d = detail[s.path];
  return `<a class="photo-tile" href="${serviceURL(s)}">${photo(d.photos[0])}<span class="tile-icon">${icon(s.icon)}</span>
    <div class="tile-copy"><h3>${s.title}</h3><p>${d.card}</p><span class="tile-link" aria-hidden="true">Explore service ${arrow}</span></div>
  </a>`;
};
const serviceCards = () => `<div class="cards photo-cards">${services.map(tile).join('')}</div>`;
const cta = (heading = 'Let’s discuss your site.', path = quote) => section(`<div class="quote-banner">
  <div class="quote-banner-copy">${eyebrow('Request a quote')}<h2>${heading}</h2><p>Tell us where your premises are, when you need support and what you want to improve.</p><div class="actions">${contactActions(path)}</div></div>
  ${photo('campus')}
</div>`, 'cta-section');
const processSection = () => section(`${titleBlock('How it works','From first enquiry to agreed next steps.','Here’s what to share and what to ask before you decide.','center')}
  <ol class="process-grid">${enquirySteps.map(([name,copy,mark],i)=>`<li><div class="process-top"><span aria-hidden="true">${String(i+1).padStart(2,'0')}</span>${iconTile(mark)}</div><h3>${name}</h3><p>${copy}</p></li>`).join('')}</ol>`, 'band');
const environmentCards = list => `<div class="environments ${list.length===3?'scenario-grid':''}">${list.map(([name,copy,photoName,mark])=>`<article>${photo(photoName)}<div><h3>${icon(mark)}${name}</h3><p>${copy}</p></div></article>`).join('')}</div>`;
const approachSection = () => section(`<div class="split approach">
  <div class="offset-images">${photo('steward')}${photo('facilities')}</div>
  <div>${titleBlock('Our approach','Start with how your building works.','An office reception, a shared entrance and a loading bay ask different things of the people who run them. Tell us who uses your site, when it is busiest and where your team needs support.')}
    <ul class="check-grid">${['Access and visitors','Hours and routines','Existing suppliers','Reporting and handovers'].map(x=>`<li>${icon('circle-check')}${x}</li>`).join('')}</ul>
    ${button('About Pereira & Rosh','/about','btn-ghost')}
  </div>
</div>`, 'band');
const coveragePanel = () => section(`<div class="coverage-panel">
  <div>${titleBlock('Location and availability','Based in Feltham, West London.','Tell us where your site is and when you need support. For Feltham, elsewhere in West London or another location, ask us to check availability against your postcode and requirements.')}
  <p class="location-chip">${iconTile('map-pin')}<span><strong>Registered office</strong><br>${c.address}</span></p>
  ${button('Check coverage','/coverage','btn-ghost')}</div>${photo('feltham')}
</div>`, 'coverage-section');
const faqSection = (items, photoName = 'corridor', title = 'Frequently asked questions.') => section(`<div class="faq-grid">
  <div>${titleBlock('FAQs',title)}${photo(photoName)}</div><div class="faq-list">${faqList(items)}</div>
</div>`, 'band');
const guides = () => `<div class="guide-grid">${articles.map((a,i)=>`<article>${photo(i===0?'access':'meeting')}<div><h3>${a.title}</h3><p>${a.desc}</p>${link('Read the guide',articleURL(a))}</div></article>`).join('')}</div>`;
const articleURL = a => '/insights/' + a.path;

add('/', 'Security & Facilities Support in Feltham', 'Discuss private security, facilities support and business support with Pereira & Rosh Protection Ltd, based in Feltham, West London.',
  wideHero('Based in Feltham, West London','Security and facilities support for your premises.',
    'Private security, facilities support and day-to-day business support for commercial premises. Send your postcode and required hours to check availability.',
    'entrance',button('Request a quote',quote)+button('Explore services','/services','btn-ghost'),
    '',`<a class="hero-phone" href="${tel}">${icon('phone')}${c.phone}</a>`) + tabs +
  section(headingRow('What we do','The right support starts with your site.','Explore three ways we can discuss helping you protect your premises and keep day-to-day operations running.',button('View all services','/services','btn-ghost')) + serviceCards()) +
  approachSection() +
  section(titleBlock('Types of premises','What does your building need?','Use these examples to explain your priorities when you enquire. Availability is confirmed for each site.','center') + environmentCards(settings), 'tint') +
  section(`<div class="split standards"><div>${titleBlock('Planning your support','Know what’s covered before you commit.','Discuss the hours, responsibilities and reporting you expect from the start.')}${photo('reception')}</div>
    <div class="standards-list">${planning.map(([name,copy,mark])=>`<article>${iconTile(mark)}<div><h3>${name}</h3><p>${copy}</p></div></article>`).join('')}</div></div>`) +
  processSection() +
  section(`<div class="split site-brief"><div>${titleBlock('Before you enquire','A useful quote begins with a clear brief.','Tell us where your premises are, who uses them and what needs to work better. Our guides give you a practical list of details to gather.')}${button('Read the planning guides','/insights','btn-ghost')}</div>${photo('notes')}</div>`, 'tint') +
  faqSection(faqs) + coveragePanel() + cta());

add('/services','Security and facilities services','Explore private security, combined facilities support and business support for business premises.',
  wideHero('Our services','Security, facilities and business support.','Start with the work you need covered, how your premises operate and which responsibilities matter most.',
    'walkway',button('Discuss your requirements',quote)+button('Browse services','#service-categories','btn-ghost'),crumb('Services')) +
  section(`<div id="service-categories">${titleBlock('Service categories','Choose the support you need.','Each service page explains what to include in your enquiry and which details help shape the scope.')}${serviceCards()}</div>`) +
  section(`<div class="split site-brief">${photo('reception')}<div>${titleBlock('Combined requirements','One site. Several responsibilities.','Some sites need help across building access, shared areas and daily operations. Explain where these responsibilities overlap, what your own team covers and what you need a provider to take on.')}${button('Discuss a combined requirement',quote,'btn-ghost')}</div></div>`, 'tint') +
  section(titleBlock('Types of premises','Plan around the people who use your building.','From office visitors to warehouse deliveries, describe how people move through your site and who looks after each area.','center')+environmentCards(settings)) +
  processSection() + coveragePanel() + faqSection(faqs,'access','Questions about arranging support.') + cta());

for (const s of services) {
  const d = detail[s.path];
  const target = quote + '?service=' + encodeURIComponent(s.title);
  add(serviceURL(s),s.title,s.summary,
    wideHero(s.title,d.headline,d.lead,d.hero,button('Request a quote',target)+button('Explore this service','#service-details','btn-ghost'),crumb(s.title,['Services','/services'])) +
    section(`<div id="service-details" class="split site-brief"><div>${titleBlock('Your requirements',s.heading,s.description)}
    <ul class="checklist">${s.points.map(([name,copy])=>`<li>${icon('circle-check')}<span><strong>${name}</strong><br>${copy}</span></li>`).join('')}</ul></div>${photo(d.photos[1])}</div>`) +
    section(titleBlock('Common scenarios',d.problem,'These examples are a starting point for your enquiry. Tell us which issues you need to address.') + environmentCards(d.scenarios),'tint') +
    section(`<div class="split site-brief">${photo(d.photos[2])}<div>${titleBlock('Prepare your enquiry','What to have to hand.','These details help us discuss the work, confirm availability and clarify what a quote can cover.')}
    <ul class="checklist">${d.checklist.map(x=>`<li>${icon('circle-check')}<span>${x}</span></li>`).join('')}</ul>${button('Prepare your enquiry',target,'btn-ghost')}</div></div>`,'band') +
    processSection() +
    faqSection([...s.faq,d.extraFaq,faqs[1]],d.photos[3],`Questions about ${s.title.toLowerCase()}.`) +
    section(titleBlock('Related services','Need support in another area?') + `<div class="related-grid">${services.filter(other=>other!==s).map(other=>`<article>${iconTile(other.icon)}<h3>${other.title}</h3><p>${detail[other.path].card}</p>${link('Explore '+other.title.toLowerCase(),serviceURL(other))}</article>`).join('')}</div>`,'tint') +
    cta('Let’s discuss your requirements.',target),s.image,'Service');
}

add('/coverage','Coverage and availability','Pereira & Rosh Protection Ltd is based in Feltham, West London. Enquire with your site postcode to check availability.',
  wideHero('Location and availability','Based in Feltham, West London.','Share your postcode, the type of premises and the dates or hours you need. We can then discuss availability for your location.',
    'feltham',contactActions(),crumb('Coverage')) +
  section(`<div class="split site-brief"><div>${titleBlock('Check your postcode','Where do you need support?','You can enquire about a site in Feltham, another West London location or elsewhere. Include the postcode for each property if you manage several sites.')}
  <p class="location-chip">${iconTile('map-pin')}<span><strong>Registered office</strong><br>${c.address}</span></p>${button('Send your site postcode',quote,'btn-ghost')}</div>${photo('mixed')}</div>`,'band') +
  processSection() + cta(), 'feltham');

add('/about','About Pereira & Rosh Protection','Meet the Feltham business behind Pereira & Rosh Protection Ltd and learn how to discuss support for your premises.',
  wideHero('About us','Pereira &amp; Rosh Protection Ltd','A Feltham-based company focused on private security, facilities support and business support for premises.',
    'facade',button('Explore our services','/services')+button('Contact us','/contact','btn-ghost'),crumb('About us')) +
  approachSection() + processSection() + coveragePanel() + cta(),'facade');

add('/insights','Guides for premises managers','Read practical guides on preparing commercial security and facilities support briefs.',inner('Insights','Planning support for your premises','Practical guides for the people who manage commercial buildings and workplaces.') +
  section(titleBlock('Planning guides','Get your requirements ready.')+guides(),'band') + cta());
for (const a of articles) {
  add(articleURL(a),a.title,a.desc,inner('Insights',a.title,a.desc,['Insights','/insights']) +
    section(`<div class="article-layout"><div class="prose">${a.blocks.map(([heading, body])=>`<h2>${heading}</h2><p>${body}</p>`).join('')}${a.path === 'security-brief' ? '<p><a href="https://www.gov.uk/check-a-private-security-licence">Check a security licence on GOV.UK</a></p>' : ''}<p>${link('Explore related services',serviceURL(services.find(s=>s.image===a.image)))}</p></div>${photo(a.path==='security-brief'?'access':'facility-team')}</div>`,'band') + cta(),a.image,'Article');
}

const contactDetails = `<p><a class="textlink" href="${tel}">${c.phone}</a></p><p><a href="${email}">${c.email}</a></p><p><strong>Registered office</strong><br>${c.address}</p>`;
add('/contact','Contact Pereira & Rosh Protection','Call or email Pereira & Rosh Protection Ltd in Feltham to discuss an enquiry.',
  wideHero('Contact','Talk to us about your premises.','Share the postcode, the hours you have in mind and a brief description of the support you need.',
    'campus',contactActions(),crumb('Contact')) +
  section(`<div class="split site-brief"><div class="contact-aside">${titleBlock('Get in touch','Speak to Pereira &amp; Rosh.','Call or email us to discuss availability and what a quote could cover.')}${contactDetails}${link('See our coverage information','/coverage')}</div>${photo('brief-desk')}</div>`,'band'),'campus');

const field = (label, name, type, required = false, attrs = '') => `<label class="field">${label}<input type="${type}" name="${name}" ${required ? 'required' : ''} ${attrs}></label>`;
add(quote,'Request a quote','Prepare an enquiry for security, facilities support or business support.',
  inner('Enquiries','Request a quote','Tell us about your premises and the kind of support you’re looking for.') +
  section(`<div class="quote-layout"><form class="form-card" id="quote-form" method="post" action="/api/enquiry"><p>${webEnquiries ? 'Required fields are marked with an asterisk.' : 'Use this form to prepare an email draft, then send it from your email app. Required fields are marked with an asterisk.'}</p>
  <div class="form-grid">
  ${field('Full name *','name','text',true,'autocomplete="name" maxlength="100"')}
  ${field('Company','company','text',false,'autocomplete="organization" maxlength="100"')}
  ${field('Email address *','email','email',true,'autocomplete="email" maxlength="160"')}
  ${field('Telephone','phone','tel',false,'autocomplete="tel" maxlength="35"')}
  <label class="field">Service required *<select name="service" required><option value="">Select a service</option>${services.map(s=>`<option>${s.title}</option>`).join('')}<option>Not sure yet</option></select></label>
  ${field('Site location or postcode *','postcode','text',true,'maxlength="100"')}
  <label class="field field-full">Tell us what you need *<textarea name="message" rows="5" minlength="10" maxlength="1500" required></textarea></label>
  <div class="trap" aria-hidden="true"><label>Website <input name="website" tabindex="-1" autocomplete="off"></label></div>
  </div><p class="status" id="form-status" role="status"></p><p>Read our <a class="textlink" href="/privacy">privacy notice</a> for how we use your details.</p>
  <div class="actions">${webEnquiries ? `<button class="btn" type="submit">Send enquiry ${arrow}</button>` : ''}<a class="btn ${webEnquiries ? 'btn-ghost' : ''}" id="email-enquiry" data-email="${email}" href="${email}">Open email draft</a></div></form>
  <aside class="contact-aside"><h2>Prefer to call?</h2>${contactDetails}</aside></div>`,'band'));

const legal = (path, title, description, blocks) => add(path,title,description,inner('Website information',title,description) + section(`<div class="prose">${blocks.map(([heading, copy])=>`<h2>${heading}</h2><p>${copy}</p>`).join('')}</div>`,'band'));
legal('/privacy','Privacy notice','How Pereira & Rosh Protection Ltd handles website and enquiry information.',[
  ['Who we are', `${esc(c.name)} is responsible for how it uses personal information. Contact <a href="${email}">${c.email}</a> or write to our registered office at ${c.address}.`],
  ['What we use and why','When you make an enquiry, we use your name, contact information and the details you choose to share to reply and consider the work you ask about. Our lawful basis is taking steps at your request before a contract where applicable, or our legitimate interests in handling business enquiries and operating the site. The hosting provider may process technical request information, such as IP addresses and timestamps, to serve and secure the website.'],
  ['Who receives it and how long we keep it','Hosting and email providers may process information needed to provide their services. Enquiry information is kept for as long as necessary to respond, manage any resulting agreement and meet applicable record-keeping requirements. Please contact us for information about a specific record or how your data is handled.'],
  ['Your rights',`You can ask for access or correction and, where applicable, ask us to delete or restrict information, object to processing or request data portability. Contact <a href="${email}">${c.email}</a> to make a request. You can also raise concerns with the <a href="https://ico.org.uk/make-a-complaint/">Information Commissioner’s Office</a>.`]
]);
legal('/cookies','Cookie policy and preferences','See which cookies and tracking technologies are in use on this site.',[
  ['Current settings','This site does not set any application cookies, store tracking preferences or load advertising and analytics scripts. There are no optional settings to change.'],
  ['Other websites','If you follow an external link or use your own email app, the service you open may use its own cookies or storage. Its privacy information explains how those technologies are used.']
]);
legal('/terms','Website terms of use','Terms for using the Pereira & Rosh Protection Ltd website.',[
  ['Service enquiries','This site provides general information about our business. A quote request begins a discussion. Service scope, availability and commercial terms are agreed separately.'],
  ['Website material','Website material is provided for information. Please contact us before reproducing or reusing any material. Links to third-party information are provided for reference.'],
  ['Company details',`${esc(c.name)} is registered in England and Wales, company number ${c.number}. Registered office: ${c.address}.`]
]);
legal('/accessibility','Accessibility statement','How to request website information in another format or report an accessibility issue.',[
  ['Using the website','The website has been designed for keyboard navigation, responsive layouts, clear text and reduced-motion preferences. We welcome feedback about anything that makes it difficult to use.'],
  ['Contact us',`Email <a href="${email}">${c.email}</a> or call <a href="${tel}">${c.phone}</a> to report an issue or ask for information in another format. If possible, include the page address and a brief description of what happened.`]
]);
add('/sitemap','Website sitemap','Find the service, contact, information and policy pages on the website.','');
add('/404','Page not found','The requested page could not be found.',inner('Page not found','This page couldn’t be found','You can return home, browse our services or get in touch.') + section(`<div class="actions">${button('Return home','/')}${button('Contact us','/contact','btn-ghost')}</div>`));
pages.get('/sitemap').main = inner('Website information','Website sitemap','Find a page on the website.') + section(`<ul class="prose">${[...pages].filter(([path])=>path!=='/404').map(([path, p])=>`<li><a href="${path}">${path === '/' ? 'Home' : esc(p.title)}</a></li>`).join('')}</ul>`,'band');

const brand = `<a class="brand" href="/" aria-label="Pereira and Rosh Protection home"><img src="/assets/pr-shield.png" width="42" height="42" alt=""><span>Pereira &amp; Rosh<small>PROTECTION LTD</small></span></a>`;
const header = path => `<a class="skip" href="#main">Skip to content</a><header class="header"><div class="wrap header-row">${brand}<nav id="main-nav" class="nav" aria-label="Main navigation">${menus.map(([label, href])=>`<a href="${href}"${path===href ? ' aria-current="page"' : ''}>${label}</a>`).join('')}<a class="mobile-quote" href="${quote}">Request a quote ${arrow}</a></nav><div class="actions">${button('Request a quote',quote)}<button class="menu" type="button" aria-controls="main-nav" aria-expanded="false">${icon('menu')}<span>Menu</span></button></div></div></header>`;
const footer = `<footer><div class="wrap"><div class="foot-grid">
  <div>${brand}<p>Private security, facilities support and business support.</p><p>Registered in England and Wales<br>Company no. ${c.number}</p></div>
  <div><h2>Company</h2><a href="/about">About</a><a href="/coverage">Coverage</a><a href="/insights">Insights</a></div>
  <div><h2>Services</h2>${services.map(s=>`<a href="${serviceURL(s)}">${s.title}</a>`).join('')}<a href="${quote}">Request a quote</a></div>
  <div><h2>Contact</h2><a href="${tel}">${c.phone}</a><a href="${email}">${c.email}</a><address>Registered office<br>${c.address}</address></div>
  </div><p class="footer-wordmark" aria-hidden="true">Pereira &amp; Rosh<span>.</span></p><div class="foot-end"><span>© 2026 ${esc(c.name)}</span><div><a href="/privacy">Privacy</a><a href="/cookies">Cookie preferences</a><a href="/terms">Terms</a><a href="/accessibility">Accessibility</a><a href="/sitemap">Sitemap</a></div><span>Designed with ♥ by <a href="mailto:hassanmanzoorbhatti@gmail.com">Hassan Manzoor</a></span></div></div></footer>`;
const organisation = {'@type':'Organization','@id':origin+'/#company',name:c.name,url:origin,telephone:c.tel,email:c.email,logo:origin+'/assets/pr-shield.png',address:{'@type':'PostalAddress',streetAddress:'350 Staines Road',addressLocality:'Feltham',postalCode:'TW14 8DA',addressCountry:'GB'}};

function pageSchema(path, page) {
  const graph = [organisation];
  if (path !== '/' && path !== '/404') {
    const ancestors = path.split('/').filter(Boolean);
    const parentPath = '/' + ancestors[0];
    const item = (position, name, url) => ({'@type':'ListItem',position,name,item:origin+url});
    const items = [item(1,'Home','/')];
    if (ancestors.length > 1) items.push(item(2, ancestors[0] === 'services' ? 'Services' : 'Insights',parentPath));
    items.push(item(items.length+1,page.title,path));
    graph.push({'@type':'BreadcrumbList',itemListElement:items});
  }
  if (page.type === 'Service') graph.push({'@type':'Service',serviceType:page.title,description:page.description,provider:{'@id':organisation['@id']},url:origin+path});
  return JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c');
}
function render(path, page) {
  const url = origin + path;
  const title = `${page.title} | Pereira & Rosh Protection`;
  return `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}"><meta name="theme-color" content="#f8f8f2">
${path === '/404' ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:type" content="${page.type === 'Article' ? 'article' : 'website'}"><meta property="og:locale" content="en_GB"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/assets/og.jpg"><meta name="twitter:card" content="summary_large_image">
${path === '/' ? '<link rel="preload" href="/assets/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>' : ''}<link rel="icon" href="/assets/pr-shield.png" type="image/png"><link rel="stylesheet" href="/assets/site.css"><script defer src="/assets/site.js"></script>
<script type="application/ld+json">${pageSchema(path,page)}</script></head>
<body>${header(path)}<main id="main">${page.main}</main>${footer}</body></html>`;
}
await rm('dist',{recursive:true,force:true});
await cp('static','dist',{recursive:true});
for (const [path, page] of pages) {
  const file = path === '/' ? 'dist/index.html' : 'dist' + path + '.html';
  await mkdir(dirname(file),{recursive:true});
  await writeFile(file,render(path,page));
}
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...pages.keys()].filter(path=>path!=='/404').map(path=>`<url><loc>${origin+path}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Built ${pages.size} pages including 404.`);
