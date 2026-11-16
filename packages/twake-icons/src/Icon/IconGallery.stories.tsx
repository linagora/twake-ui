import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Icon from '../Icon'

// Dynamically import all icon components
const iconModules = import.meta.glob('../Icons/*.tsx', { eager: true })

const icons: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {}
for (const path of Object.keys(iconModules)) {
  const mod = iconModules[path] as Record<string, unknown>
  const defaultExport = mod.default as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >
  if (defaultExport) {
    const name = path.replace('../Icons/', '').replace('.tsx', '')
    icons[name] = defaultExport
  }
}

const iconNames = Object.keys(icons).sort()

const meta: Meta = {
  title: 'Icon/Gallery'
}

export default meta
type Story = StoryObj

export const AllIcons: Story = {
  render: () => {
    const [size, setSize] = useState(24)
    const [filter, setFilter] = useState('')

    const filtered = iconNames.filter(name =>
      name.toLowerCase().includes(filter.toLowerCase())
    )

    return (
      <div style={{ padding: 24 }}>
        <div
          style={{
            marginBottom: 24,
            display: 'flex',
            gap: 16,
            alignItems: 'center'
          }}
        >
          <label>
            Size:{' '}
            <input
              type="range"
              min={8}
              max={64}
              value={size}
              onChange={e => setSize(Number(e.target.value))}
            />{' '}
            {size}px
          </label>
          <label>
            Filter:{' '}
            <input
              type="text"
              placeholder="Search icons..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={{ padding: '4px 8px', width: 200 }}
            />
          </label>
          <span>
            {filtered.length} / {iconNames.length} icons
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: 16
          }}
        >
          {filtered.map(name => {
            const IconComponent = icons[name]
            return (
              <div
                key={name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  padding: 12,
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  navigator.clipboard?.writeText(name)
                }}
                title={`Click to copy "${name}"`}
              >
                <Icon icon={IconComponent} size={size} />
                <span
                  style={{
                    fontSize: 11,
                    textAlign: 'center',
                    wordBreak: 'break-word',
                    color: '#666'
                  }}
                >
                  {name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
