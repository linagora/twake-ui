import { Slide, SlideProps } from '@mui/material'
import React, { forwardRef } from 'react'

/** Slides a full screen dialog in from the bottom of the screen */
const SlideUpTransition = forwardRef<unknown, SlideProps>((props, ref) => (
  <Slide ref={ref} direction="up" {...props} />
))

SlideUpTransition.displayName = 'SlideUpTransition'

export default SlideUpTransition
