import { useRef, useEffect, useState } from 'react'
import { Box, Button, Stack, Typography, List, ListItem, ListItemText } from '@mui/material'

export const WebSocketLogger = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [status, setStatus] = useState('Подключение...')
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    socketRef.current = new WebSocket('wss://echo.websocket.org')

    socketRef.current.onopen = () => {
      setStatus('✅ Подключено')
      console.log('WebSocket подключен')
      socketRef.current?.send('Привет из React!')
      setMessages((prev) => [...prev, '📤 Отправлено: Привет из React!'])
    }

    socketRef.current.onmessage = (event) => {
      const message = `📥 Получено: ${event.data}`
      console.log(message)
      setMessages((prev) => [...prev, message])
    }

    socketRef.current.onerror = () => {
      setStatus('❌ Ошибка подключения')
      console.error('Ошибка WebSocket')
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close()
        setStatus('Отключено')
        console.log('WebSocket закрыт')
      }
    }
  }, [])

  const sendMessage = (text: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(text)
      setMessages((prev) => [...prev, `📤 Отправлено: ${text}`])
      console.log('Отправлено сообщение:', text)
    } else {
      setStatus('❌ WebSocket не подключен')
    }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        🔌 WebSocket логгер
      </Typography>
      <Stack spacing={2}>
        <Box sx={{ p: 1.5, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="body2">
            <strong>Статус:</strong> {status}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button onClick={() => sendMessage('Тестовое сообщение')} variant="contained" size="small">
            Отправить сообщение
          </Button>
          <Button onClick={() => setMessages([])} variant="outlined" size="small">
            Очистить лог
          </Button>
        </Stack>
        <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, maxHeight: 300, overflow: 'auto' }}>
          {messages.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              Нет сообщений
            </Typography>
          ) : (
            <List dense>
              {messages.map((msg, idx) => (
                <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                  <ListItemText
                    primary={msg}
                    primaryTypographyProps={{ variant: 'body2', sx: { wordBreak: 'break-word' } }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Stack>
    </Box>
  )
}
