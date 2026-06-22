import { type CSSProperties } from 'react'

// Inject spin keyframes once at module load (SSR-safe)
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes twake-icon-spin {
      from { transform: rotate(0deg) translateZ(0); }
      to { transform: rotate(360deg) translateZ(0); }
    }
  `
  document.head.appendChild(style)
}

export const iconSpinStyle: CSSProperties = {
  animation: 'twake-icon-spin 1s linear infinite'
}
