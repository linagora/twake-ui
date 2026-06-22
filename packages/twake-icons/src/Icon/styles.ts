if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes twake-icon-spin {
      from { transform: rotate(0deg) translateZ(0); }
      to { transform: rotate(360deg) translateZ(0); }
    }
    .twake-icon { fill: currentColor; transform: translateZ(0); }
    .twake-icon--preserveColor { fill: inherit; }
    .twake-icon--spin { animation: twake-icon-spin 1s linear infinite; }
  `
  document.head.appendChild(style)
}
