import { useCallback, useState } from 'react'
import { ConfirmDialog, type ConfirmDialogOptions } from './ConfirmDialog'

interface PendingDialog {
  options: ConfirmDialogOptions
  resolve: (result: boolean) => void
}

export function useConfirmDialog() {
  const [pending, setPending] = useState<PendingDialog | null>(null)

  const showConfirmDialog = useCallback((options: ConfirmDialogOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setPending({ options, resolve })
    })
  }, [])

  const closeWithResult = useCallback((result: boolean) => {
    setPending((current) => {
      if (!current) return null
      current.resolve(result)
      return null
    })
  }, [])

  const dialog = (
    <ConfirmDialog
      isOpen={!!pending}
      title={pending?.options.title ?? ''}
      description={pending?.options.description ?? ''}
      onConfirm={() => closeWithResult(true)}
      onCancel={() => closeWithResult(false)}
    />
  )

  return { showConfirmDialog, dialog }
}
