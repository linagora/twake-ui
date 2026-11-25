// @vitest-environment jsdom
import { MenuList } from '@mui/material'
import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { I18n } from 'twake-i18n'

import { setupFrameClipboard } from '../../../lib/setupFrameClipboard.test-utils.js'
import ActionsItems from '../ActionsItems.js'
import { copyToClipboard } from './copyToClipboard.js'
import { makeActions } from './helpers.js'

describe('copyToClipboard', () => {
  const { getFrame, appWrite, frameWrite } = setupFrameClipboard()

  it('copies with the clipboard of the frame its menu is in', async () => {
    const frameDocument = (getFrame().contentWindow as Window).document
    const showAlert = vi.fn()
    const { getByText } = render(
      <I18n lang="en" dictRequire={() => ({})}>
        <MenuList>
          <ActionsItems
            docs={[{ _id: 'id01' }]}
            actions={makeActions([copyToClipboard])}
            actionOptions={{ showAlert, copyValue: 'john.doe@example.com' }}
          />
        </MenuList>
      </I18n>,
      {
        container: frameDocument.body.appendChild(
          frameDocument.createElement('div')
        )
      }
    )

    fireEvent.click(getByText('Copy'))
    await waitFor(() => {
      expect(showAlert).toHaveBeenCalledWith(
        expect.objectContaining({ severity: 'success' })
      )
    })
    expect(frameWrite).toHaveBeenCalledWith('john.doe@example.com')
    expect(appWrite).not.toHaveBeenCalled()
  })
})
