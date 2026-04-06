import { useRef, useState, useEffect } from 'react'
import { Box, TextField, Stack, Typography } from '@mui/material'

export const PreviousInput = () => {
  const [currentValue, setCurrentValue] = useState('')
  const previousValueRef = useRef('')

  useEffect(() => {
    previousValueRef.current = currentValue
  }, [currentValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value)
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        📝 Предыдущее значение
      </Typography>
      <Stack spacing={2}>
        <TextField
          value={currentValue}
          onChange={handleChange}
          placeholder="Введи текст..."
          fullWidth
          variant="outlined"
        />
        <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="body2">
            <strong>Текущее значение:</strong> {currentValue || '—'}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Предыдущее значение:</strong> {previousValueRef.current || '—'}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}
