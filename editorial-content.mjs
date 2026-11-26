export const imagery = {
  entrance: 'Daylight commercial entrance with a security professional standing beside the glass doors',
  steward: 'Smartly dressed security professional beside a commercial entrance',
  reception: 'Visitor speaking to a receptionist across the desk',
  access: 'Daylit commercial entrance gates',
  loading: 'Commercial loading bays with a marked pedestrian walkway',
  lobby: 'Bright commercial reception with a stone desk and timber panelling',
  facilities: 'Facilities professional walking through a glass office corridor',
  mixed: 'A mixed-use commercial frontage and pavement',
  meeting: 'Workplace managers discussing a printed plan at a table',
  feltham: 'Illustrative West London commercial street in daylight',
  corridor: 'Quiet commercial atrium with repeating glass and stone columns',
  facade: 'Warm stone and glass façade of a commercial property',
  warehouse: 'Daylit interior of a commercial warehouse',
  'guard-lobby': 'A security professional looking towards the doors of a stone and glass entrance hall',
  'brief-desk': 'A clipboard and pen on a stone reception counter',
  'facility-team': 'A workplace manager and colleague discussing a tablet in an office corridor',
  utility: 'Shared facilities and utility doors in a commercial property',
  workshop: 'Two colleagues talking in a commercial workshop',
  notes: 'Working notes, notebooks and mugs on a timber desk',
  campus: 'Glass and pale brick commercial building with a landscaped entrance',
  walkway: 'Daylight falling across an office campus walkway'
};

export const settings = [
  ['Office buildings', 'Office managers can use the first discussion to clarify visitor flow, access and front-of-house responsibilities.', 'lobby', 'building-2'],
  ['Managed properties', 'Property managers can describe shared entrances, tenant responsibilities and how issues are handed over.', 'facade', 'key-round'],
  ['Customer-facing premises', 'For shops and other public-facing spaces, explain busy periods, opening hours and how customers use the site.', 'mixed', 'store'],
  ['Warehouses and logistics sites', 'Share your delivery windows, contractor access and how pedestrians and vehicles use the property.', 'warehouse', 'warehouse'],
  ['Multi-occupier workplaces', 'Outline where teams share facilities and where responsibilities or handovers need to be clearer.', 'corridor', 'users-round']
];

export const process = [
  ['Tell us about the site', 'Send the postcode, type of premises and the dates or hours you have in mind.', 'phone'],
  ['Discuss the requirement', 'Explain what you want to improve and who already looks after the site.', 'clipboard-list'],
  ['Check what can be arranged', 'Discuss availability, the proposed responsibilities and what the quote would cover.', 'list-checks'],
  ['Agree the next steps', 'Confirm the point of contact, any missing details and the preferred start date.', 'handshake']
];

export const planning = [
  ['Fit around your opening hours', 'Talk through opening times, busy periods and when you need extra support.', 'clock-3'],
  ['Clear responsibilities', 'Agree where support would start and end, including work that stays with your team.', 'clipboard-check'],
  ['Practical communication', 'Specify who to contact, what needs reporting and how to handle handovers.', 'messages-square'],
  ['Scope you can compare', 'Check what is included before you compare quotes or make a decision.', 'list-checks']
];

export const detail = {
  'private-security': {
    hero: 'guard-lobby',
    photos: ['steward','access','brief-desk','loading'],
    headline: 'Private security for your premises',
    lead: 'Discuss the people, property and access arrangements you want to protect. We’re based in Feltham, West London. Share your site postcode and required hours to check availability.',
    card: 'Discuss access, visitor flow and the times your site needs support.',
    problem: 'Where does your site need closer attention?',
    scenarios: [
      ['A busy entrance', 'Tell us how visitors are received, which areas are public and when queues or access issues arise.', 'reception', 'users-round'],
      ['Shared or restricted access', 'Outline how staff, tenants and contractors enter, who authorises entry and which spaces need a clearer process.', 'access', 'key-round'],
      ['Deliveries and after-hours access', 'Describe delivery windows, arrival points and who is responsible when your main team is off-site.', 'loading', 'truck']
    ],
    checklist: ['Site postcode, opening hours and preferred start date','Visitor, staff and contractor arrangements','Priority areas and how issues should be reported','Any licensing, procurement or reporting requirements'],
    extraFaq: ['What should I check if my requirement involves licensable work?', 'Explain the activities involved when you enquire and ask what credentials can be provided for the proposed scope. GOV.UK explains how to check the relevant SIA licence.']
  },
  'facilities-support': {
    hero: 'facility-team',
    photos: ['lobby','utility','facilities','corridor'],
    headline: 'Facilities support for a well-run workplace',
    lead: 'Talk through the routines, shared spaces and handovers that need attention. Tell us which premises you manage and what’s getting in the way of a smoother day.',
    card: 'Discuss help with workplace routines, site coordination and shared spaces.',
    problem: 'Where do day-to-day tasks get held up?',
    scenarios: [
      ['Shared workplace routines', 'List recurring tasks and explain where requests, follow-ups or responsibilities are unclear.', 'facilities', 'clipboard-list'],
      ['Receptions and common areas', 'Describe how staff, visitors and occupiers use shared areas and when extra help would make a difference.', 'corridor', 'door-open'],
      ['Several suppliers on one site', 'Name the teams already involved and identify who can approve changes or take ownership of a handover.', 'mixed', 'users-round']
    ],
    checklist: ['Premises address and points of contact','Recurring tasks and busy periods','Current suppliers and how duties are divided','The outcome you want and any site-specific requirements'],
    extraFaq: ['Can I raise several facilities needs in one enquiry?', 'Yes. List them in priority order and describe what your team already handles so the discussion starts with the biggest issue.']
  },
  'business-support': {
    hero: 'workshop',
    photos: ['meeting','mixed','notes','warehouse'],
    headline: 'Business support for practical site needs',
    lead: 'Discuss operational support for a change, handover or recurring requirement at your premises. Start with the work that needs a clear owner and the deadline you’re working to.',
    card: 'Discuss practical operational help for a handover, change or recurring requirement.',
    problem: 'What work needs a clearer owner?',
    scenarios: [
      ['A handover or change on site', 'Explain what is changing, who is affected and which responsibilities need to be in place by a set date.', 'mixed', 'workflow'],
      ['A recurring operational gap', 'Describe the work that keeps resurfacing, what has been tried and how often you need support.', 'warehouse', 'clock-3'],
      ['Work across several teams', 'Identify the teams involved, who can make decisions and how updates should be shared.', 'facade', 'messages-square']
    ],
    checklist: ['A short description of the work and where it takes place','Deadline, frequency or preferred hours','Who manages the work today and who can approve changes','What would make the arrangement worthwhile for your team'],
    extraFaq: ['Can I discuss support for more than one site?', 'Include the postcode and a short description for each site. That helps clarify where the needs are similar and where they differ.']
  }
};
