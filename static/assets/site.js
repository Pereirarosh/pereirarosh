const menu = document.querySelector('.menu');
const nav = document.querySelector('#main-nav');
if (menu && nav) {
  const setOpen = open => {
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  };
  menu.addEventListener('click', () => setOpen(menu.getAttribute('aria-expanded') === 'false'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setOpen(false);
      menu.focus();
    }
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
}

const form = document.querySelector('#quote-form');
if (form) {
  const status = document.querySelector('#form-status');
  const selected = new URLSearchParams(location.search).get('service');
  if ([...form.elements.service.options].some(option => option.value === selected)) {
    form.elements.service.value = selected;
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const submit = event.submitter;
    submit.disabled = true;
    status.textContent = 'Sending your enquiry…';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      if (!response.ok) throw new Error('Enquiry unavailable');
      status.textContent = 'Your enquiry was accepted for delivery.';
      form.reset();
    } catch {
      status.textContent = 'Your enquiry could not be sent here. Please use the email option or call us.';
    } finally {
      submit.disabled = false;
    }
  });
  document.querySelector('#email-enquiry').addEventListener('click', event => {
    if (!form.reportValidity()) {
      event.preventDefault();
      return;
    }
    const details = new FormData(form);
    const labels = [['name', 'Name'], ['company', 'Company'], ['email', 'Email'], ['phone', 'Telephone'], ['service', 'Service'], ['postcode', 'Site or postcode'], ['message', 'Requirements']];
    const body = labels.map(([key, label]) => label + ': ' + details.get(key)).join('\n');
    event.currentTarget.href = event.currentTarget.dataset.email + '?subject=' + encodeURIComponent('Quote enquiry') + '&body=' + encodeURIComponent(body);
    status.textContent = 'Review the draft in your email app and send it when ready.';
  });
}
