import {
  Alert,
  AlertProps,
  CSSObject,
  alertClasses,
  styled
} from '@mui/material'
import { capitalize } from '@mui/material/utils'

import { alertSeverities } from '../../lib/overrides.js'

export type PointerAlertDirection = 'top' | 'right' | 'bottom' | 'left'

export interface PointerAlertProps extends AlertProps {
  direction?: PointerAlertDirection
  /** Arrow offset along its edge, any CSS length or percentage. `calc(0% + 0.75rem)` puts it against the starting corner. */
  position?: string
}

const ARROW_SIZE = '0.75rem'
const ARROW_BASE = `calc(2 * ${ARROW_SIZE})`
// The alert paints on whole pixels but a clip path cuts on fractional ones. Overshooting
// on the alert side leaves that edge to the arrow's box, snapped like the alert; the
// slopes are unchanged.
const BLEED = '1px'

const makeShape = (
  direction: PointerAlertDirection,
  position: string
): { root: CSSObject; arrow: CSSObject } => {
  const horizontal = { left: position, marginLeft: `-${ARROW_SIZE}` }
  const vertical = { top: position, marginTop: `-${ARROW_SIZE}` }
  const shapes: Record<PointerAlertDirection, CSSObject> = {
    top: {
      ...horizontal,
      bottom: '100%',
      width: ARROW_BASE,
      height: ARROW_SIZE,
      clipPath: `polygon(50% 0, calc(100% + ${BLEED}) calc(100% + ${BLEED}), -${BLEED} calc(100% + ${BLEED}))`
    },
    bottom: {
      ...horizontal,
      top: '100%',
      width: ARROW_BASE,
      height: ARROW_SIZE,
      clipPath: `polygon(-${BLEED} -${BLEED}, calc(100% + ${BLEED}) -${BLEED}, 50% 100%)`
    },
    left: {
      ...vertical,
      right: '100%',
      width: ARROW_SIZE,
      height: ARROW_BASE,
      clipPath: `polygon(calc(100% + ${BLEED}) -${BLEED}, calc(100% + ${BLEED}) calc(100% + ${BLEED}), 0 50%)`
    },
    right: {
      ...vertical,
      left: '100%',
      width: ARROW_SIZE,
      height: ARROW_BASE,
      clipPath: `polygon(-${BLEED} -${BLEED}, 100% 50%, -${BLEED} calc(100% + ${BLEED}))`
    }
  }
  return {
    root: { [`margin-${direction}`]: ARROW_SIZE },
    arrow: shapes[direction]
  }
}

const PointerAlert = styled(Alert, {
  shouldForwardProp: prop => prop !== 'direction' && prop !== 'position'
})<PointerAlertProps>(({ theme, direction = 'bottom', position = '50%' }) => {
  const { root, arrow } = makeShape(direction, position)
  return {
    ...root,
    position: 'relative',
    '&::after': {
      ...arrow,
      content: '""',
      position: 'absolute',
      backgroundColor: 'inherit'
    },
    // outlined alerts have no background for the arrow to inherit
    ...Object.fromEntries(
      alertSeverities.map(severity => [
        `&.${alertClasses.outlined}.MuiAlert-color${capitalize(severity)}::after`,
        { backgroundColor: theme.vars.palette[severity].main }
      ])
    )
  }
})

export default PointerAlert
