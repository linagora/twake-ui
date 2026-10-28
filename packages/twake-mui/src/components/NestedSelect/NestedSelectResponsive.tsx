import React from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import NestedSelectBottomSheet, {
  NestedSelectBottomSheetProps
} from './NestedSelectBottomSheet'
import NestedSelectModal from './NestedSelectModal'

export type NestedSelectResponsiveProps = NestedSelectBottomSheetProps

/** NestedSelect in a bottom sheet on mobile, in a dialog otherwise */
const NestedSelectResponsive = (
  props: NestedSelectResponsiveProps
): React.ReactElement => {
  const { isMobile } = useBreakpoints()

  if (isMobile) return <NestedSelectBottomSheet {...props} />

  const { componentsProps: _componentsProps, ...modalProps } = props
  return <NestedSelectModal {...modalProps} />
}

export default NestedSelectResponsive
