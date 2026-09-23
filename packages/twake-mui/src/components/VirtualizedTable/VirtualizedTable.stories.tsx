import { Button, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import { fn } from 'storybook/test'

import { VirtualizedTable, VirtualizedTableProps } from './index'
import type { CellHandler, Column, Row } from './types'

const createData = (
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Row => ({ id, name, calories, fat, carbs, protein })

const rows = [
  createData(0, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(1, 'Frozen yoghurt (unselectable)', 159, 6.0, 24, 4.0),
  createData(2, 'Donut', 452, 25.0, 51, 4.9),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
  createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
  createData(7, 'Jelly Bean', 375, 0.0, 94, 0.0),
  createData(8, 'KitKat', 518, 26.0, 65, 7.0),
  createData(9, 'Oreo', 437, 18.0, 63, 4.0),
  createData(10, 'Marshmallow', 318, 0, 81, 2.0),
  createData(11, 'Lollipop', 392, 0.2, 98, 0.0),
  createData(12, 'Nougat', 360, 19.0, 9, 37.0),
  createData(
    13,
    'Ice cream with a very long list of ingredient to see how the table can handle this kind of item, and this is the end',
    237,
    9.0,
    37,
    4.3
  )
]

const columns: Column[] = [
  { id: 'name', label: 'Dessert', width: 300, maxWidth: 300, noWrap: true },
  {
    id: 'calories',
    label: 'Calories',
    width: 80,
    textAlign: 'left',
    sortable: false
  },
  { id: 'fat', label: 'Fat (g)', width: 85, textAlign: 'right' },
  { id: 'carbs', label: 'Carbs (g)', width: 115, textAlign: 'right' },
  {
    id: 'protein',
    label: 'Protein (g)',
    width: 115,
    textAlign: 'right',
    disableClick: true
  }
]

// Very basic usage only works when Dessert is sorted "asc"
const makeGroups: VirtualizedTableProps['groups'] = () => ({
  groupLabels: ['C', 'D', 'E', 'Others'],
  groupCounts: [1, 1, 1, 11]
})

const UNSELECTABLE_ID = 1
const onDoubleClick = fn<CellHandler>().mockName('onDoubleClick')
const onLongPress = fn<CellHandler>().mockName('onLongPress')

const ExampleTable = ({
  title,
  ...props
}: Partial<VirtualizedTableProps> & { title: string }): React.ReactElement => {
  const [selected, setSelected] = useState<number[]>([])

  const toggle = (id: number): void =>
    setSelected(ids =>
      ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]
    )

  const toggleAll = (): void =>
    setSelected(ids =>
      ids.length ? [] : rows.map(r => r.id as number).filter(id => id !== 1)
    )

  return (
    <>
      <Typography sx={{ mt: 2 }} variant="h4">
        {title}
      </Typography>
      <Button sx={{ my: 2 }} variant="text" onClick={toggleAll}>
        Select all
      </Button>
      <div style={{ border: '1px solid #ccc', height: 400, width: '100%' }}>
        <VirtualizedTable
          rows={rows}
          columns={columns}
          selectedItems={selected}
          isSelectedItem={row => selected.includes(row.id as number)}
          componentsProps={{
            rowContent: {
              onClick: row =>
                row.id !== UNSELECTABLE_ID && toggle(row.id as number),
              onDoubleClick: (row, column) =>
                row.id !== UNSELECTABLE_ID && onDoubleClick(row, column),
              onLongPress: (row, column) =>
                row.id !== UNSELECTABLE_ID && onLongPress(row, column)
            }
          }}
          {...props}
        />
      </div>
    </>
  )
}

const meta: Meta<typeof VirtualizedTable> = {
  title: 'VirtualizedTable',
  component: VirtualizedTable,
  tags: ['autodocs'],
  argTypes: {
    rows: { control: 'object' },
    columns: { control: 'object' },
    defaultOrder: { control: 'object' },
    selectedItems: { control: 'object' },
    groups: { control: false },
    secondarySort: { control: false },
    isSelectedItem: { control: false },
    isNewItem: { control: false },
    context: { control: false },
    componentsProps: { control: false },
    components: { control: false }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    rows,
    columns,
    defaultOrder: { by: 'name', direction: 'asc' }
  },
  render: args => <ExampleTable title="Table" {...args} />
}

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section>
        <h3>Flat</h3>
        <ExampleTable title="Not sorted table" />
        <ExampleTable
          title="Sorted table"
          defaultOrder={{ by: 'name', direction: 'asc' }}
        />
      </section>
      <section>
        <h3>Grouped</h3>
        <ExampleTable title="Not sorted table" groups={makeGroups} />
        <ExampleTable
          title="Sorted table"
          groups={makeGroups}
          defaultOrder={{ by: 'name', direction: 'asc' }}
        />
      </section>
    </div>
  )
}
