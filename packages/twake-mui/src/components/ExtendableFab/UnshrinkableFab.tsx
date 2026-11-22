import { Fab, styled } from '@mui/material'

// The label can shrink to nothing: in a flex row the button would be squeezed
const UnshrinkableFab = styled(Fab)({ flexShrink: 0 })

export default UnshrinkableFab
