import { ActionDocument, ActionObject } from './types'

export const getActionName = (actionObject: ActionObject): string => {
  return Object.keys(actionObject)[0]
}

const isDivider = (actionObject: ActionObject): boolean => {
  const name = getActionName(actionObject)

  return name === 'hr' || name === 'divider'
}

/**
 * Keeps the actions to display: drops hidden ones, the same action twice in a
 * row, and a trailing divider. Display conditions are only known with the docs,
 * so the final list cannot be known when the actions are made.
 */
export const getOnlyNeededActions = (
  actions: ActionObject[],
  docs: ActionDocument[]
): ActionObject[] => {
  const displayableActions = actions.filter(actionObject => {
    const { displayCondition } = Object.values(actionObject)[0]

    return !displayCondition || displayCondition(docs)
  })

  const withoutRepeats = displayableActions.filter(
    (actionObject, idx) =>
      idx === 0 ||
      getActionName(actionObject) !== getActionName(displayableActions[idx - 1])
  )

  return withoutRepeats.filter(
    (actionObject, idx) =>
      !(isDivider(actionObject) && idx === withoutRepeats.length - 1)
  )
}
