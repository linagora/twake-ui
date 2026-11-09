const doc = globalThis.document

if (doc) {
  const style = doc.createElement('style')
  style.textContent = `
    @keyframes twake-icon-spin {
      from { transform: rotate(0deg) translateZ(0); }
      to { transform: rotate(360deg) translateZ(0); }
    }
    @keyframes twake-icon-draw {
      from { stroke-dashoffset: 100px; }
      to { stroke-dashoffset: 0px; }
    }
    .twake-icon { fill: currentColor; transform: translateZ(0); }
    .twake-icon--preserveColor { fill: inherit; }
    .twake-icon--spin { animation: twake-icon-spin 1s linear infinite; }
  `
  doc.head.appendChild(style)
}
