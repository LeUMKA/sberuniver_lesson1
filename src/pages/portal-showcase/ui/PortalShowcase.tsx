import { useState } from 'react'
import { Alert, Button, Stack, Typography } from '@mui/material'
import { Tooltip, TooltipPosition } from 'shared/ui/Tooltip'
import { useConfirmDialog } from 'shared/ui/ConfirmDialog'
import { useThemeMode } from 'shared/ui/theme'
import styles from './PortalShowcase.module.css'

export function PortalShowcase() {
  const { theme, toggleTheme } = useThemeMode()
  const { showConfirmDialog, dialog } = useConfirmDialog()
  const [message, setMessage] = useState('Нажми "Удалить", чтобы открыть ConfirmDialog.')

  const handleDelete = async () => {
    const confirmed = await showConfirmDialog({
      title: 'Удалить элемент?',
      description: 'Это действие необратимо.',
    })

    if (confirmed) {
      setMessage('Элемент удален (демо-режим).')
      return
    }

    setMessage('Удаление отменено.')
  }

  return (
    <div
      className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}
    >
      <Stack spacing={2}>
        <Typography variant="h4">Portal Showcase</Typography>
        <Typography>
          На этой странице оба компонента работают через createPortal и получают тему из
          React Context.
        </Typography>
        <div className={styles.row}>
          <Button variant="outlined" onClick={toggleTheme}>
            Переключить тему ({theme})
          </Button>

          <Tooltip
            position={TooltipPosition.Top}
            content="Tooltip отрендерен в #tooltip-root и не блокирует клики по родителям."
          >
            <Button variant="contained">Наведи на меня</Button>
          </Tooltip>

          <Tooltip
            position={TooltipPosition.Right}
            content="Если нажать, откроется ConfirmDialog, отрендеренный в #dialog-root."
          >
            <Button color="error" variant="contained" onClick={handleDelete}>
              Удалить
            </Button>
          </Tooltip>
        </div>

        <div className={styles.card}>
          <Alert severity="info">{message}</Alert>
        </div>
      </Stack>

      {dialog}
    </div>
  )
}
