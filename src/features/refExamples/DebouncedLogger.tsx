import { useRef, useState } from 'react'
import { Box, TextField, Stack, Typography } from '@mui/material'

export const DebouncedLogger = () => {
  const [inputValue, setInputValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    timeoutIdRef.current = setTimeout(() => {
      setDebouncedValue(value)
      timeoutIdRef.current = null
    }, 1000)
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        ⏳ Дебаунс лог
      </Typography>
      <Stack spacing={2}>
        <TextField
          value={inputValue}
          onChange={handleChange}
          placeholder="Введи текст... (логируется через 1с паузы)"
          fullWidth
          variant="outlined"
        />
        <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="body2">
            <strong>Текущий ввод:</strong> {inputValue || '—'}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }} color="success.main">
            <strong>Залогировано:</strong> {debouncedValue || '—'}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}
