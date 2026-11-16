import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Icon from '../Icon'
import Sprite from '../Icon/Sprite'

const meta: Meta = {
  title: 'Icon/Sprite Usage'
}

export default meta
type Story = StoryObj

export const StringIcons: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 16, color: '#666' }}>
        Render <code>&lt;Sprite /&gt;</code> once at the root of your app, then
        use string identifiers with <code>&lt;Icon icon="name" /&gt;</code>.
      </p>

      {/* Required: render Sprite once to inject SVG symbols into the DOM */}
      <Sprite />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {[
          'account',
          'album',
          'bank',
          'calendar',
          'check',
          'cross',
          'folder',
          'gear',
          'heart',
          'home',
          'info',
          'magnifier',
          'menu',
          'people',
          'phone',
          'plus',
          'send',
          'setting',
          'share',
          'trash',
          'upload',
          'warn'
        ].map(name => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8
            }}
          >
            <Icon icon={name} size={24} />
            <span style={{ fontSize: 11, color: '#666' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
