import {
  Alert,
  Button,
  IconButton,
  ListItemSecondaryAction,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import { Icon, Setting } from '@linagora/twake-icons'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import Avatar from '../Avatar'
import NestedSelectResponsive from './NestedSelectResponsive'
import NestedSelect from './index'
import type {
  NestedSelectItem,
  NestedSelectOptions,
  NestedSelectProps,
  NestedSelectSearchOptions
} from './types'

const LONG_TEXT =
  'Augusta Ada King-Noel, Countess of Lovelace, was an English mathematician and writer, chiefly known for her work on Charles Babbage proposed mechanical general-purpose computer.'

const letterOption = (
  letter: string,
  description?: string,
  key?: string
): NestedSelectItem => ({
  id: key ? `${letter}_${key}` : letter,
  key,
  title: letter,
  description,
  icon: <Avatar color="sugarCoral">{letter[0]}</Avatar>
})

const SettingAction = ({
  item,
  onClick
}: {
  item: NestedSelectItem
  onClick: (item: NestedSelectItem) => void
}): React.ReactElement => (
  <ListItemSecondaryAction>
    <IconButton aria-label="Settings" onClick={() => onClick(item)}>
      <Icon icon={Setting} />
    </IconButton>
  </ListItemSecondaryAction>
)

const makeOptions = ({
  withHeaders = false,
  focusedId
}: {
  withHeaders?: boolean
  focusedId?: string
} = {}): NestedSelectOptions => ({
  focusedId,
  header: withHeaders && (
    <Alert className="u-mt-1 u-mh-1" icon={false}>
      This is a header for options
    </Alert>
  ),
  childrenHeader: withHeaders
    ? (level: number): React.ReactNode =>
        level === 1 ? (
          <Alert className="u-mt-1 u-mh-1">
            This is specific option header for first children
          </Alert>
        ) : (
          <Alert className="u-mt-1 u-mh-1" icon={false} severity="secondary">
            This is specific option header for other children
          </Alert>
        )
    : undefined,
  children: [
    { ...letterOption('A', 'is for Apple'), info: 'info' },
    {
      ...letterOption('B', 'is for Balloon'),
      children: [
        {
          ...letterOption('B1'),
          children: [letterOption('B1a'), letterOption('B1b')]
        },
        {
          ...letterOption('B2'),
          header: withHeaders && (
            <Alert className="u-mt-1 u-mh-1" icon={false} severity="success">
              This is overriden specific option!
            </Alert>
          ),
          children: [letterOption('B2a'), letterOption('B2b')]
        },
        letterOption('B3')
      ]
    },
    {
      ...letterOption('C', 'is for crayon'),
      action: {
        Component: SettingAction,
        props: { onClick: () => undefined }
      }
    },
    letterOption('D', 'is for Drums !'),
    letterOption(
      `E. A very long option, that should be ellipsed. ${LONG_TEXT}`,
      `Its description is also very long and will be ellipsed. ${LONG_TEXT}`
    ),
    letterOption('F'),
    letterOption('G'),
    letterOption('H', 'for hero', 'hero'),
    letterOption('H', 'for helicopter', 'helicopter'),
    letterOption('I'),
    letterOption('J'),
    letterOption('K'),
    letterOption('L'),
    letterOption('M'),
    letterOption('N')
  ]
})

const makeSearchOptions = (): NestedSelectSearchOptions => ({
  placeholderSearch: 'Placeholder Search',
  noDataLabel: 'No Data Found',
  onSearch: value =>
    (makeOptions().children ?? []).filter(
      option =>
        typeof option.description === 'string' &&
        option.description.toLowerCase().includes(value.toLowerCase())
    )
})

const transformParentItem = (item: NestedSelectItem): NestedSelectItem => ({
  ...item,
  title: <>All of {item.title}</>
})

interface ExampleArgs {
  noTitle: boolean
  noDivider: boolean
  leftRadio: boolean
  withSearch: boolean
  withEllipsis: boolean
  withHeaders: boolean
  canSelectParent: boolean
  withFocus: boolean
}

const Example = ({
  noTitle,
  noDivider,
  leftRadio,
  withSearch,
  withEllipsis,
  withHeaders,
  canSelectParent,
  withFocus
}: ExampleArgs): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(letterOption('A'))

  const handleSelect = (item: NestedSelectItem): void => {
    setSelectedItem(item)
    setIsOpen(false)
  }

  return (
    <>
      <Typography className="u-mb-1">
        Selected item: {selectedItem.title} {selectedItem.description}
      </Typography>
      <Button onClick={() => setIsOpen(true)}>Select</Button>
      {isOpen && (
        <NestedSelectResponsive
          canSelectParent={canSelectParent}
          onSelect={handleSelect}
          onClose={() => setIsOpen(false)}
          isSelected={item => item.id === selectedItem.id}
          options={makeOptions({
            withHeaders,
            focusedId: withFocus ? selectedItem.id : undefined
          })}
          radioPosition={leftRadio ? 'left' : 'right'}
          title={noTitle ? undefined : 'Please select letter'}
          transformParentItem={transformParentItem}
          searchOptions={withSearch ? makeSearchOptions() : undefined}
          ellipsis={withEllipsis}
          noDivider={noDivider}
        />
      )}
    </>
  )
}

const meta: Meta<typeof Example> = {
  title: 'NestedSelect',
  component: Example,
  tags: ['autodocs'],
  args: {
    noTitle: false,
    noDivider: false,
    leftRadio: false,
    withSearch: false,
    withEllipsis: true,
    withHeaders: false,
    canSelectParent: true,
    withFocus: false
  },
  argTypes: {
    noTitle: { control: 'boolean' },
    noDivider: { control: 'boolean' },
    leftRadio: { control: 'boolean' },
    withSearch: { control: 'boolean' },
    withEllipsis: { control: 'boolean' },
    withHeaders: { control: 'boolean' },
    canSelectParent: { control: 'boolean' },
    withFocus: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const Section = ({
  label,
  ...props
}: Partial<NestedSelectProps> & { label: string }): React.ReactElement => (
  <section>
    <h3>{label}</h3>
    <Paper variant="outlined">
      <NestedSelect
        onSelect={() => undefined}
        isSelected={item => item.title === 'A' || item.title === 'B1a'}
        options={{
          ...makeOptions(),
          children: makeOptions().children?.slice(0, 5)
        }}
        title="Please select letter"
        transformParentItem={transformParentItem}
        {...props}
      />
    </Paper>
  </section>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos', '!autodocs'],
  render: () => (
    <Stack spacing={4}>
      <Section label="Default" />
      <Section label="Left radio" radioPosition="left" />
      <Section label="No divider" noDivider />
      <Section label="No ellipsis" ellipsis={false} />
      <Section label="With search" searchOptions={makeSearchOptions()} />
      <Section
        label="With headers"
        options={makeOptions({ withHeaders: true })}
      />
      <Section
        label="Focused on B1a, with selectable parent"
        canSelectParent
        options={makeOptions({ withHeaders: true, focusedId: 'B1a' })}
      />
    </Stack>
  )
}

const ResponsiveExample = (): React.ReactElement => {
  const { isMobile } = useBreakpoints()

  return (
    <NestedSelectResponsive
      radioPosition={isMobile ? 'left' : 'right'}
      canSelectParent
      onSelect={() => undefined}
      isSelected={item => item.title === 'C'}
      options={makeOptions()}
      title="Please select letter"
      transformParentItem={transformParentItem}
      componentsProps={{ bottomsheet: { skipAnimation: true } }}
      onClose={() => undefined}
    />
  )
}

// Visual Regression - dialog on desktop, bottom sheet on mobile
export const ResponsiveScreenshot: Story = {
  tags: ['argos', '!autodocs'],
  parameters: { layout: 'fullscreen' },
  render: () => <ResponsiveExample />
}
