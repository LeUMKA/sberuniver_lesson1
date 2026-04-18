import { useEffect, useMemo, useState } from 'react'
import type { FocusEvent, MouseEvent, PointerEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { TooltipPosition } from './TooltipPosition'
import { useThemeMode } from 'shared/ui/theme'
import styles from './Tooltip.module.css'

interface TooltipProps {
  content: string
  position?: TooltipPosition
  children: ReactNode
}

const TOOLTIP_OFFSET = 10

const getCoordinates = (
  rect: DOMRect,
  position: TooltipPosition,
): { top: number; left: number; translateX: string; translateY: string } => {
  switch (position) {
    case TooltipPosition.Top:
      return {
        top: rect.top - TOOLTIP_OFFSET,
        left: rect.left + rect.width / 2,
        translateX: '-50%',
        translateY: '-100%',
      }
    case TooltipPosition.Bottom:
      return {
        top: rect.bottom + TOOLTIP_OFFSET,
        left: rect.left + rect.width / 2,
        translateX: '-50%',
        translateY: '0',
      }
    case TooltipPosition.Left:
      return {
        top: rect.top + rect.height / 2,
        left: rect.left - TOOLTIP_OFFSET,
        translateX: '-100%',
        translateY: '-50%',
      }
    case TooltipPosition.Right:
    default:
      return {
        top: rect.top + rect.height / 2,
        left: rect.right + TOOLTIP_OFFSET,
        translateX: '0',
        translateY: '-50%',
      }
  }
}

export function Tooltip({ content, position = TooltipPosition.Top, children }: TooltipProps) {
  const { theme } = useThemeMode()
  const [tooltipRoot, setTooltipRoot] = useState<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    const existing = document.getElementById('tooltip-root')
    if (existing) {
      setTooltipRoot(existing)
      return
    }

    const created = document.createElement('div')
    created.id = 'tooltip-root'
    document.body.appendChild(created)
    setTooltipRoot(created)
  }, [])

  const style = useMemo(() => {
    if (!anchorRect) return undefined
    const next = getCoordinates(anchorRect, position)
    return {
      top: next.top,
      left: next.left,
      transform: `translate(${next.translateX}, ${next.translateY})`,
    }
  }, [anchorRect, position])

  const showTooltip = (target: EventTarget & HTMLSpanElement) => {
    setAnchorRect(target.getBoundingClientRect())
    setIsVisible(true)
  }

  const handlePointerEnter = (event: PointerEvent<HTMLSpanElement>) => {
    showTooltip(event.currentTarget)
  }

  const handleMouseMove = (event: MouseEvent<HTMLSpanElement>) => {
    showTooltip(event.currentTarget)
  }

  const handleFocus = (event: FocusEvent<HTMLSpanElement>) => {
    showTooltip(event.currentTarget)
  }

  const hideTooltip = () => {
    setIsVisible(false)
  }

  return (
    <span
      className={styles.wrapper}
      onPointerEnter={handlePointerEnter}
      onMouseMove={handleMouseMove}
      onPointerLeave={hideTooltip}
      onFocus={handleFocus}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && tooltipRoot
        ? createPortal(
            <div
              role="tooltip"
              className={`${styles.tooltip} ${theme === 'dark' ? styles.dark : styles.light}`}
              style={{
                ...style,
                position: 'fixed',
                zIndex: 2147483647,
                maxWidth: 260,
                padding: '8px 10px',
                borderRadius: 8,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                pointerEvents: 'none',
                fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
                fontSize: 12,
                lineHeight: 1.3,
                background: theme === 'dark' ? '#f6f7f9' : '#202124',
                color: theme === 'dark' ? '#111' : '#fff',
                border: '1px solid rgba(0, 0, 0, 0.2)',
              }}
            >
              {content}
            </div>,
            tooltipRoot,
          )
        : null}
    </span>
  )
}
