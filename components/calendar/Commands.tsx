'use client'

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { calendarViewModes } from '@/lib/constants'
import { isSubString } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { ViewModeType } from '@/types/calendarTypes'
import { format, isValid, parse, set } from 'date-fns'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

const dateFormats = [
    'dd',
    'LL',
    'LLL',
    'LLLL',
    'uuuu',
    'yyyy',
    'dd M',
    'dd MM',
    'dd MMM',
    'dd MMMM',
    'd M uuuu',
    'd MM uuuu  ',
    'd MMM uuuu',
    'd MMMM uuuu',
    'dd M uuuu',
    'dd MM uuuu',
    'dd MMM uuuu',
    'dd MMMM uuuu',
] as const

export function CommandMenu() {
    const [command, setCommand] = useState('')
    const { selectedDate, viewMode, commandMode } = useAppSelector(
        (state) => state.calendar
    )

    const [possibleDates, setPossibleDates] = useState<
        Record<string, (typeof dateFormats)[number]>
    >({})

    const {
        reset,
        setDate,
        setMonthView,
        setDayView,
        setYearView,
        setWeekView,
        toggleCommandFlag,
        setWeekendsView,
    } = useCalendarAction()

    const viewSuggestions = useMemo(
        () => [
            {
                label: 'Day View',
                value: calendarViewModes.DAY,
                isValid: (mode: ViewModeType) => mode !== calendarViewModes.DAY,
                handler: () => {
                    setDayView()
                    toggleCommand()
                },
            },
            {
                label: 'Week View',
                value: calendarViewModes.WEEK,
                isValid: (mode: ViewModeType) =>
                    mode !== calendarViewModes.WEEK,
                handler: () => {
                    setWeekView()
                    toggleCommand()
                },
            },
            {
                label: 'Month View',
                value: calendarViewModes.MONTH,
                isValid: (mode: ViewModeType) =>
                    mode !== calendarViewModes.MONTH,
                handler: () => {
                    setMonthView()
                    toggleCommand()
                },
            },
            {
                label: 'Year View',
                value: calendarViewModes.YEAR,
                isValid: (mode: ViewModeType) =>
                    mode !== calendarViewModes.YEAR,
                handler: () => {
                    setYearView()
                    toggleCommand()
                },
            },
            {
                label: 'Today',
                value: 'today',
                isValid: () =>
                    format(new Date(selectedDate), 'dd-MM-yyyy') !==
                    format(new Date(), 'dd-MM-yyyy'),
                handler: () => {
                    reset()
                    toggleCommand()
                },
            },
            {
                label: 'Weekends',
                value: 'weekends',
                isValid: () => true,
                handler: () => {
                    setWeekendsView()
                    toggleCommand()
                },
            },
        ],
        [selectedDate]
    )

    const getDateVariations = (
        date: Date,
        strFormat: (typeof dateFormats)[number]
    ) => {
        Array.from({ length: 12 }, (_, i) => {
            let finalDate = set(selectedDate, {
                month: i,
                date: date.getDate(),
            })

            let formattedDate = format(finalDate, 'dd MMMM uuuu')
            setPossibleDates((ref) => {
                if (!ref[formattedDate]) {
                    return {
                        ...ref,
                        [formattedDate]: strFormat,
                    }
                }
                return ref
            })
        })
    }

    const getPossibleDateSets = () => {
        for (let stringFormat of dateFormats) {
            let date = parse(command, stringFormat, new Date(selectedDate))

            if (isValid(date)) {
                if (stringFormat === 'dd') {
                    getDateVariations(date, stringFormat)
                }

                if (
                    stringFormat === 'LL' ||
                    stringFormat === 'LLL' ||
                    stringFormat === 'LLLL'
                ) {
                    let finalDate = set(selectedDate, {
                        month: date.getMonth(),
                    })

                    let formattedDate = format(finalDate, 'dd MMMM uuuu')

                    setPossibleDates((ref) => {
                        if (!ref[formattedDate]) {
                            return {
                                ...ref,
                                [formattedDate]: stringFormat,
                            }
                        }
                        return ref
                    })
                } else if (stringFormat === 'uuuu' || stringFormat === 'yyyy') {
                    let finalDate = set(selectedDate, {
                        year: date.getFullYear(),
                    })

                    let formattedDate = format(finalDate, 'dd MMMM uuuu')

                    setPossibleDates((ref) => {
                        if (!ref[formattedDate]) {
                            return {
                                ...ref,
                                [formattedDate]: stringFormat,
                            }
                        }
                        return ref
                    })
                } else {
                    let finalDate = set(selectedDate, {
                        date: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear(),
                    })

                    let formattedDate = format(finalDate, 'dd MMMM uuuu')

                    setPossibleDates((ref) => {
                        if (!ref[formattedDate]) {
                            return {
                                ...ref,
                                [formattedDate]: stringFormat,
                            }
                        }
                        return ref
                    })
                }
            }
        }
    }

    useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                toggleCommand()
                event.preventDefault()
            }
        }
        window.addEventListener('keydown', down)
        return () => window.removeEventListener('keydown', down)
    }, [])

    const toggleCommand = () => {
        toggleCommandFlag()
        setCommand('')
        setPossibleDates({})
    }

    useEffect(() => {
        getPossibleDateSets()
    }, [command])

    return (
        <div>
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: commandMode ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={cn('hidden md:block')}
            >
                <Input
                    type="text"
                    placeholder="⌘ + K"
                    onFocus={() => toggleCommand()}
                    className="text-end w-[100px]"
                />
            </motion.div>

            <CommandDialog open={commandMode} onOpenChange={toggleCommand}>
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder="Type a command or search..."
                        value={command}
                        onValueChange={setCommand}
                    />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            {viewSuggestions.map((suggestion) => {
                                if (!suggestion.isValid(viewMode)) {
                                    return null
                                }

                                if (
                                    isSubString(
                                        suggestion.label.trim().toLowerCase(),
                                        command.trim().toLowerCase()
                                    )
                                )
                                    return (
                                        <CommandItem
                                            key={suggestion.value}
                                            onSelect={(value) => {
                                                suggestion.handler()
                                            }}
                                        >
                                            {suggestion.label}
                                        </CommandItem>
                                    )
                            })}
                            {Object.keys(possibleDates).map((date, index) => {
                                if (
                                    isSubString(
                                        `Go To ${date
                                            .trim()
                                            .toLowerCase()}`.toLowerCase(),
                                        command.trim().toLowerCase()
                                    )
                                )
                                    return (
                                        <CommandItem
                                            key={
                                                date.toString() + ' - ' + index
                                            }
                                            id={date.toString()}
                                            value={`Go To ${date}`}
                                            onSelect={() => {
                                                setDate(new Date(date))
                                                toggleCommand()
                                            }}
                                        >
                                            Go To {date}
                                        </CommandItem>
                                    )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </div>
    )
}
