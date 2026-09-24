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
  Box,
  Checkbox,
  IconButton,
  List,
  ListItemIcon,
  ListItemSecondaryAction,
  ListSubheader,
  Radio,
  Stack
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { ListItemCozyProps } from './helpers'
import { ListItem } from './index'
import { ListItemButton } from '../ListItemButton'
import { ListItemText } from '../ListItemText'

const longText =
  'Ada Lovelace wrote the first algorithm meant to be carried out by a machine, long before any computer existed to run it.'

const cozyArgTypes = {
  gutters: {
    control: 'select',
    options: ['default', 'double', 'disabled']
  },
  size: {
    control: 'select',
    options: ['small', 'medium', 'large']
  },
  ellipsis: { control: 'boolean' },
  dense: { control: 'boolean' },
  divider: { control: 'boolean' },
  alignItems: {
    control: 'select',
    options: ['center', 'flex-start']
  }
} as const

const meta: Meta<typeof ListItem> = {
  title: 'ListItem',
  component: ListItem,
  subcomponents: { ListItemButton },
  tags: ['autodocs'],
  argTypes: cozyArgTypes,
  decorators: [
    (Story): React.ReactElement => (
      <Box sx={{ maxWidth: 480 }}>
        <Story />
      </Box>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

const defaultContent = [
  <ListItemIcon key="icon">
    <Icon icon={Comment} />
  </ListItemIcon>,
  <ListItemText key="text" primary="I'm a primary text" />
]

export const Default: Story = {
  args: {
    gutters: 'default',
    size: 'medium',
    ellipsis: true
  },
  render: args => (
    <List>
      <ListItem {...args}>{defaultContent}</ListItem>
    </List>
  )
}

export const Button: StoryObj<typeof ListItemButton> = {
  argTypes: {
    ...cozyArgTypes,
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  args: {
    gutters: 'default',
    size: 'medium',
    ellipsis: true
  },
  render: args => (
    <List>
      <ListItemButton {...args}>{defaultContent}</ListItemButton>
    </List>
  )
}

interface ExampleProps extends ListItemCozyProps {
  title: string
  button?: boolean
  dense?: boolean
  selected?: boolean
  disabled?: boolean
  longText?: boolean
  iconSize?: number
  multipleLeftIcons?: boolean
  multipleRightIcons?: boolean
  withActions?: boolean
}

const Example: React.FC<ExampleProps> = ({
  title,
  button = true,
  dense,
  selected,
  disabled,
  longText: isLongText,
  iconSize = 16,
  multipleLeftIcons,
  multipleRightIcons,
  withActions,
  ...props
}) => {
  const content = [
    <ListItemIcon key="comment">
      <Icon icon={Comment} size={iconSize} />
    </ListItemIcon>,
    multipleLeftIcons && (
      <React.Fragment key="left">
        <ListItemIcon>
          <Icon icon={People} size={iconSize} />
        </ListItemIcon>
        <ListItemIcon>
          <Radio />
        </ListItemIcon>
        <ListItemIcon>
          <Checkbox />
        </ListItemIcon>
      </React.Fragment>
    ),
    <ListItemText
      key="text"
      primary={isLongText ? longText : "I'm a primary text"}
    />,
    multipleRightIcons && (
      <React.Fragment key="right">
        <ListItemIcon>
          <Icon icon={Right} size={iconSize} />
        </ListItemIcon>
        <ListItemIcon>
          <Radio />
        </ListItemIcon>
        <ListItemIcon>
          <Checkbox />
        </ListItemIcon>
      </React.Fragment>
    ),
    withActions && (
      <ListItemSecondaryAction key="actions">
        <IconButton>
          <Icon icon={Pen} />
        </IconButton>
        <IconButton>
          <Icon icon={Trash} />
        </IconButton>
        <IconButton>
          <Icon icon={Dots} />
        </IconButton>
      </ListItemSecondaryAction>
    )
  ]

  return (
    <section>
      <h3>{title}</h3>
      <List dense={dense} subheader={<ListSubheader>Section 1</ListSubheader>}>
        {button ? (
          <ListItemButton selected={selected} disabled={disabled} {...props}>
            {content}
          </ListItemButton>
        ) : (
          <ListItem {...props}>{content}</ListItem>
        )}
      </List>
    </section>
  )
}

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Example title="Default" />
      <Example title="Dense" dense />
      <Example title="Long text" longText />
      <Example title="Long text without ellipsis" longText ellipsis={false} />
      <Example title="Disabled gutters" gutters="disabled" />
      <Example title="Double gutters" gutters="double" />
      <Example title="Small" size="small" />
      <Example title="Large" size="large" />
      <Example title="Dense small" dense size="small" />
      <Example title="Dense large" dense size="large" />
      <Example title="Big icons" iconSize={32} />
      <Example title="Small icons" iconSize={8} />
      <Example title="Multiple left icons" multipleLeftIcons />
      <Example title="Multiple right icons" multipleRightIcons />
      <Example
        title="Multiple right icons, double gutters"
        multipleRightIcons
        gutters="double"
      />
      <Example title="With actions" withActions longText />
      <Example
        title="With actions, double gutters"
        withActions
        longText
        gutters="double"
      />
      <Example title="Selected" selected />
      <Example title="Disabled" disabled />
      <Example title="Not a button" button={false} />
      <Example
        title="Not a button, dense small"
        button={false}
        dense
        size="small"
      />
      <Example title="Not a button, with actions" button={false} withActions />
    </Stack>
  )
}
