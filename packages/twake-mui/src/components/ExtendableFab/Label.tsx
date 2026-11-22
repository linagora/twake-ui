import { styled } from '@mui/material'

// Folded, the label shrinks to nothing and the extended padding leaves a
// square around the icon; the label stays the accessible name. A grid track
// going from 0fr to 1fr animates to the real width of the text.
const Label = styled('span', {
  shouldForwardProp: prop => prop !== 'isFolded'
})<{ isFolded: boolean }>(({ theme, isFolded }) => ({
  display: 'inline-grid',
  gridTemplateColumns: isFolded ? '0fr' : '1fr',
  marginInlineStart: isFolded ? 0 : theme.spacing(1),
  opacity: isFolded ? 0 : 1,
  transition: theme.transitions.create(
    ['grid-template-columns', 'margin-inline-start', 'opacity'],
    { duration: theme.transitions.duration.short }
  ),
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none'
  },
  ...(theme.motion.reducedMotion === 'always' && { transition: 'none' }),
  '& > span': {
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
}))

export default Label
