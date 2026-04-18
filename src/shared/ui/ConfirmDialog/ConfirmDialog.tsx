import { Button } from '@mui/material'
import { createPortal } from 'react-dom'
import { useThemeMode } from 'shared/ui/theme'
import styles from './ConfirmDialog.module.css'

export interface ConfirmDialogOptions {
  title: string
  description: string
}

interface ConfirmDialogProps extends ConfirmDialogOptions {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRoot = document.getElementById('dialog-root')
  const { theme } = useThemeMode()

  if (!isOpen || !dialogRoot) return null

  return createPortal(
    <div className={styles.overlay} role="presentation" onClick={onCancel}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className={`${styles.dialog} ${theme === 'dark' ? styles.dark : styles.light}`}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-dialog-title" className={styles.title}>
          {title}
        </h2>
        <p id="confirm-dialog-description" className={styles.description}>
          {description}
        </p>
        <div className={styles.actions}>
          <Button variant="text" onClick={onCancel}>
            Отмена
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Подтвердить
          </Button>
        </div>
      </div>
    </div>,
    dialogRoot,
  )
}
