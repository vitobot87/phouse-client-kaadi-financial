const savedTheme = localStorage.getItem('theme') || 'system';
const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (savedTheme === 'system' && prefersDark)) {
  document.documentElement.classList.add('dark');
}
document.documentElement.dataset.theme = savedTheme;
