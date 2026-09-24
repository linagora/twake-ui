import {
  Comment,
  Dots,
  FileTypeFolder,
  FileTypeText,
  Help,
  Icon,
  LinkOut,
  MagicTrick,
  People,
  PieChart,
  Right
} from '@linagora/twake-icons'
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemIcon,
  ListItemSecondaryAction,
  Radio,
  Stack,
  Typography
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { ListItemCozyProps } from '../components/ListItem/helpers'
import { ListItemButton } from '../components/ListItemButton'
import { ListItemText } from '../components/ListItemText'
import { ListSubheader } from '../components/ListSubheader'

const longText =
  'Ada Lovelace wrote the first algorithm meant to be carried out by a machine, long before any computer existed to run it.'

interface DemoProps extends ListItemCozyProps {
  dense?: boolean
}

const Demo: React.FC<DemoProps> = ({ dense, ...itemProps }) => (
  <>
    <List dense={dense} subheader={<ListSubheader>Section 1</ListSubheader>}>
      <ListItemButton {...itemProps}>
        <ListItemIcon>
          <Icon icon={FileTypeFolder} size={32} />
        </ListItemIcon>
        <ListItemText primary="I'm a primary text" />
        <ListItemText secondary="Metadata" />
        <ListItemText secondary="Metadata" />
      </ListItemButton>
      <Divider component="li" variant="inset" />
      <ListItemButton {...itemProps}>
        <ListItemIcon>
          <Icon icon={FileTypeText} size={32} />
        </ListItemIcon>
        <ListItemText
          primary="I'm a primary text"
          secondary="I'm a secondary text"
        />
      </ListItemButton>
      <Divider component="li" variant="inset" />
      <ListItemButton {...itemProps}>
        <ListItemIcon>
          <Icon icon={FileTypeText} size={32} />
        </ListItemIcon>
        <ListItemText
          primary="I'm a primary text"
          secondary="I'm a secondary text"
          slotProps={{
            primary: { variant: 'caption' },
            secondary: { color: 'inherit', variant: dense ? 'body2' : 'body1' }
          }}
        />
      </ListItemButton>
    </List>

    <List dense={dense} subheader={<ListSubheader>Section 2</ListSubheader>}>
      <ListItemButton {...itemProps}>
        <ListItemIcon>
          <Icon icon={Comment} />
        </ListItemIcon>
        <ListItemText primary="Support" />
        <ListItemSecondaryAction>
          <IconButton>
            <Icon icon={Dots} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemButton>
      <Divider component="li" variant="inset" />
      <ListItemButton {...itemProps}>
        <ListItemIcon>
          <Icon icon={MagicTrick} />
        </ListItemIcon>
        <ListItemText primary="Double actions" />
        <ListItemSecondaryAction>
          <IconButton>
            <Icon icon={Right} />
          </IconButton>
          <IconButton>
            <Icon icon={Dots} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemButton>
    </List>

    <Divider />

    <List dense={dense}>
      <ListItemButton {...itemProps}>
        <ListItemIcon>
          <Icon icon={People} />
        </ListItemIcon>
        <ListItemText primary="Profil" />
        <ListItemIcon>
          <Icon icon={Right} />
        </ListItemIcon>
      </ListItemButton>
      <Divider component="li" variant="inset" />
      <ListItemButton {...itemProps}>
        <ListItemIcon>
          <Icon icon={People} />
        </ListItemIcon>
        <ListItemText primary={longText} secondary={longText} />
        <ListItemIcon>
          <Radio />
        </ListItemIcon>
      </ListItemButton>
      <Divider component="li" variant="inset" />
      <ListItemButton {...itemProps}>
        <ListItemIcon>
          <Icon icon={Help} />
        </ListItemIcon>
        <ListItemText primary="Help" />
        <ListItemIcon>
          <Icon icon={LinkOut} />
        </ListItemIcon>
      </ListItemButton>
      <Divider component="li" variant="inset" />
      <ListItemButton {...itemProps}>
        <ListItemIcon>
          <Icon icon={PieChart} />
        </ListItemIcon>
        <ListItemText primary="Storage" />
        <Typography variant="body2" color="textSecondary">
          82% used
        </Typography>
        <ListItemIcon>
          <Icon icon={Right} />
        </ListItemIcon>
      </ListItemButton>
    </List>
  </>
)

const HighlightedItem: React.FC = () => (
  <List>
    <ListItemButton>
      <ListItemIcon>
        <Icon icon={FileTypeFolder} size={32} />
      </ListItemIcon>
      <ListItemText primary="I'm a primary text" />
    </ListItemButton>
    <Divider variant="inset" />
    <ListItemButton selected>
      <ListItemIcon>
        <Icon icon={FileTypeText} size={32} />
      </ListItemIcon>
      <ListItemText
        primary="I'm a primary text"
        secondary="I'm a secondary text"
      />
    </ListItemButton>
    <Divider variant="inset" />
    <ListItemButton>
      <ListItemIcon>
        <Icon icon={FileTypeText} size={32} />
      </ListItemIcon>
      <ListItemText primary="I'm a primary text" />
    </ListItemButton>
  </List>
)

const meta: Meta<typeof Demo> = {
  title: 'List',
  component: Demo,
  tags: ['autodocs'],
  argTypes: {
    dense: { control: 'boolean' },
    gutters: {
      control: 'select',
      options: ['default', 'double', 'disabled']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    }
  },
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

export const Default: Story = {
  args: {
    dense: false,
    gutters: 'default',
    size: 'medium'
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3>{title}</h3>
    {children}
  </section>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Row title="Default">
        <Demo />
      </Row>
      <Row title="Dense">
        <Demo dense />
      </Row>
      <Row title="Disabled gutters">
        <Demo gutters="disabled" />
      </Row>
      <Row title="Double gutters">
        <Demo gutters="double" />
      </Row>
      <Row title="Small">
        <Demo size="small" />
      </Row>
      <Row title="Large">
        <Demo size="large" />
      </Row>
      <Row title="Highlighted item">
        <HighlightedItem />
      </Row>
    </Stack>
  )
}
