import {
  Comment,
  Dots,
  Icon,
  Pen,
  People,
  Right,
  Trash
} from '@linagora/twake-icons'
import {
  Checkbox,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Radio,
  Stack
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { ListItem, ListItemProps } from './index'

const sizes = ['small', 'medium', 'large'] as const
const guttersOptions = ['default', 'double', 'disabled'] as const

const longText =
  "Augusta Ada King, Countess of Lovelace (née Byron; 10 December 1815 – 27 November 1852) was an English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine."

const meta: Meta<typeof ListItem> = {
  title: 'ListItem',
  component: ListItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: sizes },
    gutters: { control: 'select', options: guttersOptions },
    dense: { control: 'boolean' },
    divider: { control: 'boolean' },
    disablePadding: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const actions = (
  <>
    <IconButton>
      <Icon icon={Pen} />
    </IconButton>
    <IconButton>
      <Icon icon={Trash} />
    </IconButton>
    <IconButton>
      <Icon icon={Dots} />
    </IconButton>
  </>
)

export const Default: Story = {
  args: { size: 'medium', gutters: 'default' },
  render: args => (
    <List sx={{ width: 480 }}>
      <ListItem {...args}>
        <ListItemIcon>
          <Icon icon={Comment} />
        </ListItemIcon>
        <ListItemText primary="I'm a primary text" />
      </ListItem>
    </List>
  )
}

type ExampleProps = ListItemProps & {
  iconSize?: number
  text?: string
  multipleLeftIcons?: boolean
  multipleRightIcons?: boolean
  withActions?: boolean
}

// The cozy-ui doc example, with the same variant toggles. Its `button` prop
// is MUI v9's ListItemButton, so the row keeps its hover.
const Example: React.FC<ExampleProps> = ({
  iconSize = 16,
  text = "I'm a primary text",
  multipleLeftIcons,
  multipleRightIcons,
  withActions,
  ...props
}) => {
  const content = (
    <>
      <ListItemIcon>
        <Icon icon={Comment} size={iconSize} />
      </ListItemIcon>
      {multipleLeftIcons && (
        <>
          <ListItemIcon>
            <Icon icon={People} size={iconSize} />
          </ListItemIcon>
          <ListItemIcon>
            <Radio />
          </ListItemIcon>
          <ListItemIcon>
            <Checkbox />
          </ListItemIcon>
        </>
      )}
      <ListItemText primary={text} />
      {multipleRightIcons && (
        <>
          <ListItemIcon>
            <Icon icon={Right} size={iconSize} />
          </ListItemIcon>
          <ListItemIcon>
            <Radio />
          </ListItemIcon>
          <ListItemIcon>
            <Checkbox />
          </ListItemIcon>
        </>
      )}
    </>
  )

  return (
    <ListItem
      secondaryAction={withActions ? actions : undefined}
      disablePadding
      {...props}
    >
      <ListItemButton>{content}</ListItemButton>
    </ListItem>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    <List
      disablePadding
      sx={{ width: 640 }}
      subheader={<ListSubheader>Section 1</ListSubheader>}
    >
      {children}
    </List>
  </section>
)

// Visual Regression - Every variant of the cozy-ui ListItem doc
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Section title="Sizes">
        {sizes.map(size => (
          <Example key={size} size={size} text={size} />
        ))}
      </Section>

      <Section title="Sizes, dense">
        {sizes.map(size => (
          <Example key={size} size={size} text={`${size} dense`} dense />
        ))}
      </Section>

      <Section title="Gutters">
        {guttersOptions.map(gutters => (
          <Example
            key={gutters}
            gutters={gutters}
            text={`${gutters} gutters`}
          />
        ))}
      </Section>

      <Section title="Icons">
        <Example iconSize={8} text="Small icons" />
        <Example iconSize={32} text="Big icons" />
        <Example multipleLeftIcons text="Multiple left icons" />
        <Example multipleRightIcons text="Multiple right icons" />
      </Section>

      <Section title="Actions">
        <Example withActions />
        <Example withActions gutters="double" />
        <Example withActions text={longText} />
      </Section>

      <Section title="Long text">
        <Example text={longText} />
        <Example text={longText} withActions />
      </Section>
    </Stack>
  )
}
