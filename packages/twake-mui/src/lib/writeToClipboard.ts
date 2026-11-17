/**
 * Writes with the clipboard of the window holding `element`: a component may
 * be rendered in a frame other than the one running the app
 */
export const writeToClipboard = async (
  text: string,
  element?: Element | null
): Promise<void> => {
  const view = element?.ownerDocument.defaultView ?? window
  await view.navigator.clipboard.writeText(text)
}
