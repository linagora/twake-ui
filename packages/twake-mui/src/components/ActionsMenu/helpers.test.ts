import { describe, expect, it } from 'vitest'

import { getOnlyNeededActions } from './helpers'
import { Action, ActionDocument, ActionObject } from './types'

const Component = (): null => null

const makeTestAction = (
  name: string,
  displayCondition?: Action['displayCondition']
): ActionObject => ({ [name]: { name, Component, displayCondition } })

const toNames = (actions: ActionObject[]): string[] =>
  actions.map(actionObject => Object.keys(actionObject)[0])

const docs: ActionDocument[] = [{ _id: 'id01' }]

describe('getOnlyNeededActions', () => {
  it('should drop actions whose display condition is false', () => {
    const actions = [
      makeTestAction('shown', () => true),
      makeTestAction('hidden', () => false)
    ]

    expect(toNames(getOnlyNeededActions(actions, docs))).toEqual(['shown'])
  })

  it('should drop the same action repeated in a row', () => {
    const actions = [
      makeTestAction('a'),
      makeTestAction('divider'),
      makeTestAction('hidden', () => false),
      makeTestAction('divider'),
      makeTestAction('divider'),
      makeTestAction('b')
    ]

    expect(toNames(getOnlyNeededActions(actions, docs))).toEqual([
      'a',
      'divider',
      'b'
    ])
  })

  it('should drop a trailing divider', () => {
    const actions = [
      makeTestAction('a'),
      makeTestAction('hr'),
      makeTestAction('hidden', () => false)
    ]

    expect(toNames(getOnlyNeededActions(actions, docs))).toEqual(['a'])
  })
})
