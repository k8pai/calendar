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
import { useClockAction } from '@/hooks/useClockActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { fuzzyFilter } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { Timezone, TimezoneName } from 'countries-and-timezones'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

export function ClockCommands({ countries }: { countries: Timezone[] }) {
    const [command, setCommand] = useState('')
    const { commandMode } = useAppSelector((state) => state.calendar)

    const { toggleCommandFlag } = useCalendarAction()
    const { setLocalTimeZone } = useClockAction()

    const toggleCommand = () => {
        toggleCommandFlag()
        setCommand('')
    }

    const onSelect = (value: TimezoneName) => {
        setLocalTimeZone(value)
        toggleCommand()
        setCommand(value)
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

    let displayCountries = useMemo(
        () => fuzzyFilter(countries, command, (item) => item.name).slice(0, 10),
        [command]
    )

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
                    className="text-end"
                />
            </motion.div>

            <CommandDialog open={commandMode} onOpenChange={toggleCommand}>
                <Command>
                    <CommandInput
                        placeholder="Type a command or search..."
                        value={command}
                        onValueChange={setCommand}
                    />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            {displayCountries.map((country, index) => {
                                return (
                                    <CommandItem
                                        key={country.name}
                                        onSelect={(value) =>
                                            onSelect(value as TimezoneName)
                                        }
                                    >
                                        {country.name}
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
