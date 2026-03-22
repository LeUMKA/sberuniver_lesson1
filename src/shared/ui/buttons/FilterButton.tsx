import { InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import { memo } from 'react';

interface IFilterButtonProps {
  filter: string
  onChange: (event: SelectChangeEvent) => void
  menuItems: { value: string; label: string }[]
  stateLabel?: string
}

export const FilterButton = memo(({
  filter,
  onChange,
  menuItems,
  stateLabel,
}: IFilterButtonProps) => {
  const label = stateLabel ?? 'Статус'

  return (
    <>
      <InputLabel id="task-filter-label">{label}</InputLabel>
      <Select labelId="task-filter-label" label={label} value={filter} onChange={onChange}>
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </>
  )
})
