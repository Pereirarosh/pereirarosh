const fields = {name:100, company:100, email:160, phone:35, service:40, postcode:100, message:1500};
const services = new Set(['Private security','Facilities support','Business support','Not sure yet']);

module.exports = async function enquiry(req, res) {
  res.setHeader('Cache-Control','no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow','POST');
    return res.status(405).json({error:'Method not allowed.'});
  }
  if (!req.headers['content-type']?.startsWith('application/json')) {
    return res.status(415).json({error:'Unsupported content type.'});
  }
  const host = req.headers.host;
  if (req.headers.origin !== 'https://' + host && req.headers.origin !== 'http://' + host) {
    return res.status(403).json({error:'Origin did not match.'});
  }
  if (Number(req.headers['content-length']) > 12000) {
    return res.status(413).json({error:'Enquiry is too long.'});
  }
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body) || body.website) {
    return res.status(400).json({error:'Please check your enquiry.'});
  }
  const data = {};
  for (const [field, max] of Object.entries(fields)) {
    const value = body[field] ?? '';
    if (typeof value !== 'string' || value.length > max) {
      return res.status(400).json({error:'Please check your enquiry.'});
    }
    data[field] = value.trim();
  }
  if (!data.name || !data.postcode || data.message.length < 10 ||
    !services.has(data.service) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return res.status(400).json({error:'Please complete all required fields.'});
  }
  const key = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!key || !from) return res.status(503).json({error:'Use the email or phone option.'});

  const message = Object.entries(data).map(([name, value]) => name + ': ' + value).join('\n');
  try {
    const result = await fetch('https://api.resend.com/emails', {
      method:'POST',
      headers:{Authorization:'Bearer ' + key,'Content-Type':'application/json'},
      body:JSON.stringify({from,to:['info@pereiraroshprotection.co.uk'],reply_to:data.email,subject:'Website quote enquiry',text:message}),
      signal:AbortSignal.timeout(8000)
    });
    if (result.ok) return res.status(202).json({accepted:true});
  } catch {
    return res.status(502).json({error:'Email provider unavailable.'});
  }
  return res.status(502).json({error:'Email provider declined the enquiry.'});
};
