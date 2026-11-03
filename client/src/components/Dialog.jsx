import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Dialog = ({ titleId, onClose, children, maxWidthClass = 'max-w-lg', panelClassName = '' }) => {
    const dialogRef = useRef(null)
    const onCloseRef = useRef(onClose)

    useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])

    useEffect(() => {
        const previousOverflow = document.body.style.overflow
        const previouslyFocused = document.activeElement
        document.body.style.overflow = 'hidden'

        const focusableSelector = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        const firstFocusable = dialogRef.current?.querySelector(focusableSelector)
        ;(firstFocusable || dialogRef.current)?.focus()

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                onCloseRef.current()
                return
            }

            if (event.key !== 'Tab' || !dialogRef.current) return

            const focusable = [...dialogRef.current.querySelectorAll(focusableSelector)]
                .filter((element) => element.getClientRects().length > 0)
            if (focusable.length === 0) {
                event.preventDefault()
                dialogRef.current.focus()
                return
            }

            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKeyDown)
            if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) previouslyFocused.focus()
        }
    }, [])

    return createPortal(
        <div
            className='fixed inset-0 z-60 flex items-start justify-center overflow-y-auto bg-slate-950/55 p-3 backdrop-blur-sm animate-fade-in sm:p-5'
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose()
            }}
        >
            <section
                ref={dialogRef}
                role='dialog'
                aria-modal='true'
                aria-labelledby={titleId}
                tabIndex={-1}
                className={`relative my-2 w-full ${maxWidthClass} rounded-2xl border border-white/70 bg-white shadow-2xl shadow-slate-950/25 ring-1 ring-slate-950/5 animate-slide-up focus:outline-none sm:my-5 ${panelClassName}`}
                onMouseDown={(event) => event.stopPropagation()}
            >
                {children}
            </section>
        </div>,
        document.body
    )
}

export default Dialog
