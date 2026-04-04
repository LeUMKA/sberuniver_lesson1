import { useRef, useState } from 'react'
import { Box, TextField, Button, Stack, Typography } from '@mui/material'

interface FocusData {
  focusTransitions: number
}

export const FocusTracker = () => {
  const [transitionCount, setTransitionCount] = useState(0)
  const firstInputRef = useRef<HTMLInputElement>(null)
  const secondInputRef = useRef<HTMLInputElement>(null)
  const focusDataRef = useRef<FocusData>({
    focusTransitions: 0,
  })

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget) {
      focusDataRef.current.focusTransitions += 1
      setTransitionCount(focusDataRef.current.focusTransitions)
      console.log(`Переходы фокуса: ${focusDataRef.current.focusTransitions}`)
    }
  }

  const handleFocusFirst = () => {
    firstInputRef.current?.focus()
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        👁️ Отслеживание фокуса
      </Typography>
      <Stack spacing={2}>
        <TextField
          inputRef={firstInputRef}
          placeholder="Первое поле"
          onFocus={handleFocus}
          fullWidth
          variant="outlined"
        />
        <TextField
          inputRef={secondInputRef}
          placeholder="Второе поле"
          onFocus={handleFocus}
          fullWidth
          variant="outlined"
        />
        <Button onClick={handleFocusFirst} variant="contained">
          Сфокусировать на первом
        </Button>
        <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="body2" color="success.main">
            <strong>Переходы фокуса:</strong> {transitionCount}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}
