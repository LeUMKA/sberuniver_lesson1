import { InputLabel, MenuItem, Select } from '@mui/material'

interface IFilterButtonProps {
  filter: string
  onChange: (event: any) => void
  menuItems: { value: string; label: string }[]
  stateLabel?: string
}

export const FilterButton = ({
  filter,
  onChange,
  menuItems,
  stateLabel,
}: IFilterButtonProps) => {
  return (
    <>
      <InputLabel id="task-filter-label">{stateLabel}</InputLabel>
      <Select
        labelId="task-filter-label"
        label="Статус"
        value={filter}
        onChange={onChange}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
