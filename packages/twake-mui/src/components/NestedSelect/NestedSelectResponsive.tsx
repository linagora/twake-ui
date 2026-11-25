import React from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints.js'
import NestedSelectBottomSheet, {
  NestedSelectBottomSheetProps
} from './NestedSelectBottomSheet.js'
import NestedSelectModal from './NestedSelectModal.js'

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
