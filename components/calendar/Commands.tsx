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
import { MONTHS, viewModes } from '@/lib/constants'
import { isSubString } from '@/lib/helpers'
import { ViewModeType } from '@/types/calendarTypes'
import { format, isValid, parse, set } from 'date-fns'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

const dateFormats = [
    // 'd',
    'dd',
    'LL',
    'LLL',
    'LLLL',
    // 'uuuu',
    // 'yyyy',
    // 'd M',
    // 'd MM',
    // 'd MMM',
    // 'd MMMM',
    // 'dd M',
    // 'dd MM',
    // 'dd MMM',
    // 'dd MMMM',
    // 'MM',
    // 'MMM',
    // 'MMMM',
    // 'LL',
    // 'LLL',
    // 'LLLL',
    // 'uuuu',
    // 'yyyy',
    // 'd M uuuu',
    // 'd MM uuuu',
    // 'd MMM uuuu',
    // 'd MMMM uuuu',
    // 'dd M uuuu',
    // 'dd MM uuuu',
    // 'dd MMM uuuu',
    // 'dd MMMM uuuu',
] as const

const dateMonthCombo = [
    'd',
    'dd',
    'd M',
    'd MM',
    'd MMM',
    'd MMMM',
    'dd M',
    'dd MM',
    'dd MMM',
    'dd MMMM',
]
interface DateConfigs {
    date?: number
    month?: number
    year?: number
}

export function CommandMenu() {
    const [command, setCommand] = useState('')
    const { selectedDate, viewMode, commandMode } = useAppSelector(
        (state) => state.calendar
    )
    const {
        reset,
        setMonthView,
        setDayView,
        setYearView,
        setWeekView,
        toggleCommandFlag,
    } = useCalendarAction()

    const viewSuggestions = useMemo(
        () => [
            {
                label: 'Day View',
                value: viewModes.DAY,
                isValid: (mode: ViewModeType) => mode !== viewModes.DAY,
                handler: () => {
                    setDayView()
                    toggleCommand()
                },
            },
            {
                label: 'Week View',
                value: viewModes.WEEK,
                isValid: (mode: ViewModeType) => mode !== viewModes.WEEK,
                handler: () => {
                    setWeekView()
                    toggleCommand()
                },
            },
            {
                label: 'Month View',
                value: viewModes.MONTH,
                isValid: (mode: ViewModeType) => mode !== viewModes.MONTH,
                handler: () => {
                    setMonthView()
                    toggleCommand()
                },
            },
            {
                label: 'Year View',
                value: viewModes.YEAR,
                isValid: (mode: ViewModeType) => mode !== viewModes.YEAR,
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
        ],
        [selectedDate]
    )

    const getDateVariations = (
        date: Date,
        strFormat: (typeof dateFormats)[number],
        dateSet: Record<string, (typeof dateFormats)[number]>
    ) => {
        let response: Record<string, (typeof dateFormats)[number]> = {}
        Array.from({ length: 12 }, (_, i) => {
            let finalDate = set(selectedDate, {
                month: i,
                date: date.getDate(),
            })

            let formattedDate = format(finalDate, 'dd MMMM uuuu')
            if (!response[formattedDate]) response[formattedDate] = strFormat
        })
        return response
    }

    const getMonthVariations = () => {
        // for checking presence of the
        let response: Record<string, boolean> = {}
        MONTHS.filter((iter, index) => {
            if (iter.toLowerCase().startsWith(command.toLowerCase())) {
                console.log('command => ', command, iter)
                let finalDate = set(selectedDate, {
                    month: index,
                })

                let formattedDate = format(finalDate, 'dd MMMM uuuu')

                if (!response[formattedDate]) response[formattedDate] = true
            }
        })

        return Object.keys(response)
    }

    const getPossibleDateSets = () => {
        let dateSet: Record<string, (typeof dateFormats)[number]> = {}
        let dateVariants: Record<string, (typeof dateFormats)[number]> = {}
        for (let stringFormat of dateFormats) {
            let date = parse(command, stringFormat, new Date(selectedDate))

            console.log('date and validations : ', date, stringFormat)
            if (isValid(date)) {
                console.log('date is follows...', format(date, 'dd-mm-yyyy'))
                dateVariants = getDateVariations(date, stringFormat, dateSet)
                console.log(
                    'date variations for ' + stringFormat + ': ',
                    dateVariants,
                    stringFormat
                )
                let finalDate = set(selectedDate, {
                    date: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                })
                let formattedDate = format(finalDate, 'dd MMMM uuuu')
                if (!dateSet[formattedDate])
                    dateSet[formattedDate] = stringFormat
            }
        }
        let monthVariants = getMonthVariations()

        let response = [
            ...Object.keys(dateVariants),
            // ...Object.keys(dateSet),
            // ...monthVariants,
        ]

        return response
    }

    useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                // toggleKeystroke()
                event.preventDefault()
                toggleCommandFlag()
            }
        }
        window.addEventListener('keydown', down)
        return () => window.removeEventListener('keydown', down)
    }, [])

    const toggleCommand = () => {
        toggleCommandFlag()
        setCommand('')
    }

    useEffect(() => {
        console.log('getPossibleDateSets changed: ', getPossibleDateSets())
    }, [getPossibleDateSets])

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
            >
                <Input
                    type="text"
                    placeholder="⌘ + K"
                    onFocus={() => toggleCommand()}
                    className="text-end w-[100px]"
                />
            </motion.div>

            <CommandDialog open={commandMode} onOpenChange={toggleCommand}>
                <Command
                    filter={(value, search, keywords) => {
                        let trimmedValue = value.trim().toLowerCase()
                        let trimmedSearch = search.trim().toLowerCase()

                        // TODO: some modifications needs to be done here...
                        // ?needs to implement keywords filtering as well...
                        // *logic goes something like this...
                        // if (
                        //     keywords?.some((kw) =>
                        //         isSubString(trimmedSearch, kw)
                        //     )
                        // )
                        // return 1

                        if (isSubString(trimmedSearch, trimmedValue)) return 1

                        return 0
                    }}
                >
                    <CommandInput
                        placeholder="Type a command or search..."
                        value={command}
                        onValueChange={setCommand}
                    />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            {viewSuggestions.map((suggestion) => {
                                console.log(
                                    'suggestion',
                                    suggestion.value,
                                    suggestion.isValid(viewMode)
                                )
                                if (!suggestion.isValid(viewMode)) {
                                    return null
                                }
                                return (
                                    <CommandItem
                                        key={suggestion.value}
                                        // value={suggestion.value}
                                        // keywords={[
                                        //     suggestion.label,
                                        //     // suggestion.value,
                                        // ]}
                                        onSelect={(value) => {
                                            console.log('value =>', value)
                                            suggestion.handler()
                                        }}
                                    >
                                        {suggestion.label}
                                    </CommandItem>
                                )
                            })}
                            {getPossibleDateSets().map((date, index) => {
                                return (
                                    <CommandItem
                                        key={date.toString() + ' - ' + index}
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
