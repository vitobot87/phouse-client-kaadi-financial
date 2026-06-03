const root = document.documentElement;
const themeBtn = document.getElementById('theme');
const systemDark = matchMedia('(prefers-color-scheme: dark)');
const states = ['system', 'light', 'dark'];
const icons = { system: '◐', light: '☼', dark: '☾' };

function resolvedTheme(theme) {
  return theme === 'system' ? (systemDark.matches ? 'dark' : 'light') : theme;
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  root.classList.toggle('dark', resolvedTheme(theme) === 'dark');
  themeBtn.textContent = icons[theme];
  themeBtn.title = `Theme: ${theme}`;
  themeBtn.setAttribute('aria-label', `Theme: ${theme}`);
  localStorage.setItem('theme', theme);
}

applyTheme(localStorage.getItem('theme') || 'system');
themeBtn.addEventListener('click', () => {
  applyTheme(states[(states.indexOf(root.dataset.theme) + 1) % states.length]);
});
systemDark.addEventListener?.('change', () => {
  if (root.dataset.theme === 'system') applyTheme('system');
});

const nav = document.querySelector('.nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 8), { passive: true });

document.getElementById('contactForm')?.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById('formStatus');
  const button = form.querySelector('button');
  status.textContent = 'Sending...';
  button.disabled = true;
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.error || 'Something went wrong.');
    status.textContent = 'Thanks — your inquiry was sent.';
    form.reset();
  } catch (error) {
    status.textContent = error.message || 'Could not send. Please try again in a moment.';
  } finally {
    button.disabled = false;
  }
});
