import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Timezone } from 'countries-and-timezones'
import { AnimatePresence, motion } from 'motion/react'

export function TiSelect({
    options,
    onChange = () => {},

    ...rest
}: {
    options: Timezone[]
    onChange?: (value: Timezone) => void
}) {
    const [isOpen, setIsOpen] = useState(false)

    const [choices, setChoices] = useState(options)
    const componentRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                componentRef.current &&
                !componentRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside as EventListener)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [componentRef])

    const toggleOptions = () => {
        setIsOpen(!isOpen)
    }

    const handleClick = (option: Timezone) => {
        // if (!option.disable && option.name !== selected) {
        // setSelected({ name: option.name, value: option.name })
        onChange(option)
        setIsOpen(false)
        // }
    }

    return (
        <div className={`relative bg-transparent w-full`} ref={componentRef}>
            <div
                aria-hidden={isOpen}
                className={`appearance-none rounded-lg overflow-hidden text-gray-500 py-2 pl-3 pr-10 leading-tight transition border-secondary bg-background outline-secondary`}
                onClick={toggleOptions}
            >
                <span
                    className={`font-semibold tracking-wide select-none text-foreground`}
                >
                    {'Add a timezone'}
                </span>
                <ChevronDown
                    className={`absolute inset-y-0 right-0 h-full mx-3 scale-75`}
                />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        aria-hidden={!isOpen}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className={`absolute top-full left-0 py-1 right-0 z-10 bg-background border-accent rounded-md shadow-lg mt-1 overflow-auto max-h-60`}
                    >
                        {choices.map((option, optionIdx) => {
                            return (
                                <div
                                    key={optionIdx}
                                    className={`relative select-none py-2 transition-all ease-in-out font-semibold ${
                                        false ? 'pr-4 pl-11' : 'px-4'
                                    }`}
                                    onClick={() => {
                                        console.log('option => ', option)
                                        handleClick(option)
                                    }}
                                >
                                    <>
                                        <span className={`block truncate`}>
                                            {option.name}
                                        </span>
                                    </>
                                </div>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
