import { createContext } from 'react'

/** Id that `BottomSheetTitle` puts on its text, so that it names the sheet, like `DialogTitle` */
const BottomSheetTitleIdContext = createContext<string | undefined>(undefined)

export default BottomSheetTitleIdContext
