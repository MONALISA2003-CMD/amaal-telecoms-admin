(() => {
  'use strict';
  const form = document.getElementById('f');
  const state = document.getElementById('state');
  const message = document.getElementById('msg');

  function setMessage(text, kind = 'status') {
    if (!message) return;
    message.className = kind;
    message.textContent = text;
  }

  if (!form) return;

  // The server renders the enabled/disabled state directly. This avoids a
  // client-side availability check becoming a single point of failure.
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setMessage('Working…', 'status');
    const button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    try {
      const body = Object.fromEntries(new FormData(form));
      const response = await fetch('/api/recovery/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'same-origin',
        cache: 'no-store',
        body: JSON.stringify(body)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `Recovery failed (${response.status})`);
      setMessage('Administrator access reset. Returning to first-time setup…', 'status ok');
      setTimeout(() => { window.location.assign('/'); }, 800);
    } catch (error) {
      setMessage(error?.message || 'Recovery failed.', 'status bad');
      if (button) button.disabled = false;
    }
  });
})();
