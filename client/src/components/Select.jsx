import { ChevronDownIcon, CheckIcon } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

const Select = ({
    id,
    name,
    ariaLabel,
    options,
    value,
    defaultValue = '',
    onValueChange,
    placeholder = 'Select an option',
    disabled = false,
    required = false,
}) => {
    const generatedId = useId()
    const listboxId = `${id || generatedId}-options`
    const rootRef = useRef(null)
    const optionRefs = useRef([])
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const selectedValue = isControlled ? value : internalValue
    const selectedOption = options.find((option) => option.value === selectedValue)

    useEffect(() => {
        if (!isOpen) return undefined

        const closeOnOutsideClick = (event) => {
            if (!rootRef.current?.contains(event.target)) setIsOpen(false)
        }

        document.addEventListener('pointerdown', closeOnOutsideClick)
        return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
    }, [isOpen])

    useEffect(() => {
        if (isOpen) optionRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' })
    }, [activeIndex, isOpen])

    const selectOption = (option) => {
        if (!isControlled) setInternalValue(option.value)
        onValueChange?.(option.value)
        setIsOpen(false)
    }

    const openAt = (index = Math.max(options.findIndex((option) => option.value === selectedValue), 0)) => {
        setActiveIndex(index)
        setIsOpen(true)
    }

    const handleKeyDown = (event) => {
        if (disabled) return

        if (!isOpen) {
            if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
                event.preventDefault()
                openAt(event.key === 'ArrowUp' ? options.length - 1 : undefined)
            }
            return
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            const direction = event.key === 'ArrowDown' ? 1 : -1
            setActiveIndex((index) => (index + direction + options.length) % options.length)
        } else if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault()
            setActiveIndex(event.key === 'Home' ? 0 : options.length - 1)
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            if (options[activeIndex]) selectOption(options[activeIndex])
        } else if (event.key === 'Escape' || event.key === 'Tab') {
            setIsOpen(false)
        }
    }

    return (
        <div ref={rootRef} className='relative w-full'>
            {name && <input type='hidden' name={name} value={selectedValue} />}
            <button
                id={id || generatedId}
                aria-label={ariaLabel}
                type='button'
                role='combobox'
                aria-haspopup='listbox'
                aria-expanded={isOpen}
                aria-controls={listboxId}
                aria-activedescendant={isOpen && options[activeIndex] ? `${listboxId}-${activeIndex}` : undefined}
                aria-required={required || undefined}
                disabled={disabled}
                onClick={() => (isOpen ? setIsOpen(false) : openAt())}
                onKeyDown={handleKeyDown}
                className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left text-sm shadow-sm shadow-slate-900/2 outline-none transition-all duration-200 hover:border-slate-300 focus-visible:border-indigo-400 focus-visible:ring-4 focus-visible:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${
                    isOpen ? 'border-indigo-300 ring-4 ring-indigo-500/10' : ''
                }`}
            >
                <span className={`min-w-0 flex-1 truncate ${selectedOption ? 'font-medium text-slate-700' : 'text-slate-400'}`}>
                    {selectedOption?.label || placeholder}
                </span>
                <ChevronDownIcon size={16} className={`shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
            </button>

            {isOpen && (
                <ul
                    id={listboxId}
                    role='listbox'
                    aria-labelledby={id || generatedId}
                    className='animate-dropdown-in absolute left-0 right-0 top-[calc(100%+0.5rem)] z-70 max-h-64 overflow-y-auto rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-xl shadow-slate-900/12 ring-1 ring-black/3'
                >
                    {options.map((option, index) => {
                        const isSelected = option.value === selectedValue
                        const isActive = index === activeIndex

                        return (
                            <li
                                key={option.value}
                                id={`${listboxId}-${index}`}
                                ref={(element) => { optionRefs.current[index] = element }}
                                role='option'
                                aria-selected={isSelected}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => selectOption(option)}
                                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                                    isSelected
                                        ? 'bg-indigo-50 font-semibold text-indigo-700'
                                        : isActive
                                            ? 'bg-slate-50 text-slate-900'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <span className='min-w-0 truncate'>{option.label}</span>
                                {isSelected && <CheckIcon size={15} className='shrink-0 text-indigo-600' />}
                            </li>
                        )
                    })}
                    {options.length === 0 && (
                        <li className='px-3 py-3 text-center text-sm text-slate-400'>No options available</li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default Select
