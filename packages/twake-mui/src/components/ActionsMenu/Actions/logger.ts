import minilog from 'cozy-minilog'

export const logger: { error: (...args: unknown[]) => void } = minilog(
  'twake-mui/ActionsMenu'
)
