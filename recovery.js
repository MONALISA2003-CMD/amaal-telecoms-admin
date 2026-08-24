(() => {
  'use strict';
  const form = document.getElementById('f');
  const state = document.getElementById('state');
  const formArea = document.getElementById('formarea');
  const message = document.getElementById('msg');

  function setStatus(text, kind = 'status') {
    state.className = kind;
    state.textContent = text;
  }

  function setMessage(text, kind = 'status') {
    message.className = kind;
    message.textContent = text;
  }

  async function checkAvailability() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch('/api/recovery/status', {
        method: 'GET',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `Recovery status failed (${response.status})`);
      if (data.enabled) {
        setStatus('Recovery is enabled. Continue only if you intend to reset administrator access.', 'status ok');
        formArea.style.display = 'block';
      } else {
        setStatus('Recovery is currently disabled. Add ADMIN_RECOVERY_TOKEN in Render Environment, redeploy, then reload this page.', 'status');
      }
    } catch (error) {
      const reason = error?.name === 'AbortError' ? 'The recovery status request timed out.' : 'Could not check recovery availability.';
      setStatus(`${reason} Confirm /api/health is available, then reload.`, 'status bad');
    } finally {
      clearTimeout(timeout);
    }
  }

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

  checkAvailability();
})();
