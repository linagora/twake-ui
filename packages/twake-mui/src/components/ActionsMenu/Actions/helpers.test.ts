// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'

import { makeActions, makeBase64FromFile } from './helpers'
import { Action } from '../types'

const Component = (): null => null

const makeTestAction = (
  name: string,
  displayCondition?: Action['displayCondition']
): (() => Action) =>
  function testAction(): Action {
    return { name, Component, displayCondition }
  }

const toNames = (actions: ReturnType<typeof makeActions>): string[] =>
  actions.map(actionObject => Object.keys(actionObject)[0])

describe('makeActions', () => {
  it('should return an empty array without actions', () => {
    expect(makeActions()).toStrictEqual([])
  })

  it('should skip falsy actions', () => {
    const action = makeTestAction('first')

    expect(toNames(makeActions([undefined, action, null, false, action]))).toEqual(
      ['first', 'first']
    )
  })

  it('should key each action by its name', () => {
    const [actionObject] = makeActions([makeTestAction('first')])

    expect(actionObject.first.name).toBe('first')
  })

  it('should key an action without name by its function name', () => {
    const [actionObject] = makeActions([makeTestAction('')])

    expect(Object.keys(actionObject)).toEqual(['testAction'])
  })

  it('should pass the options to every action', () => {
    const [actionObject] = makeActions(
      [({ label }: { label: string }): Action => ({ name: 'a', label, Component })],
      { label: 'Label' }
    )

    expect(actionObject.a.label).toBe('Label')
  })
})

describe('makeBase64FromFile', () => {
  it('should return a base64 data URL for a file', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })

    expect(await makeBase64FromFile(file)).toMatch(
      /^data:text\/plain;base64,[a-zA-Z0-9+/]+={0,2}$/
    )
  })
})
