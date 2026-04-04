import { useRef, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import type { ClickData } from './types'

export const ClickTimer = () => {
  const [clickInfo, setClickInfo] = useState<string>('')
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  })

  const handleClick = () => {
    if (clickDataRef.current.startTime === null) {
      clickDataRef.current.startTime = Date.now()
    }

    clickDataRef.current.clickCount += 1

    const timeDifference = Date.now() - clickDataRef.current.startTime
    const message = `Время с первого клика: ${timeDifference}ms, Всего кликов: ${clickDataRef.current.clickCount}`

    setClickInfo(message)
    console.log(message)
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        ⏱️ Счётчик кликов
      </Typography>
      <Stack spacing={2}>
        <Button onClick={handleClick} variant="contained" size="large">
          Нажми на меня
        </Button>
        {clickInfo && (
          <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
            <Typography variant="body2" color="success.main">
              {clickInfo}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  )
}
