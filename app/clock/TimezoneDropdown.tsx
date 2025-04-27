import { useClockAction } from '@/hooks/useClockActions'
import { Timezone, TimezoneName } from 'countries-and-timezones'
import { useState } from 'react'

import { TiSelect } from '@/app/clock/MultiSelect'

const TimezoneDropdown = ({ countries }: { countries: Timezone[] }) => {
    const [command, setCommand] = useState('')
    const { addTimezoneList } = useClockAction()
    return (
        <div>
            {/* <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {countries.slice(0, 30).map((country, index) => {
                        return (
                            <SelectItem
                                key={country.name}
                                value={country.value}
                                onClick={(value) =>
                                    addTimezoneList(value as TimezoneName)
                                }
                            >
                                {country.name}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>

            <select
                onChange={(e) => {
                    console.log('onChange value => ', e.target.value)
                    addTimezoneList(e.target.value as TimezoneName)
                }}
                className="w-[180px] rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-700 shadow-sm focus:border-gray-300 focus:outline-none "
            >
                {countries.map((country, index) => {
                    return (
                        <option
                            key={country.name}
                            value={country.value}
                            className={
                                'text-sm text-gray-700 hover:bg-gray-100'
                            }
                        >
                            {country.name}
                        </option>
                    )
                })}
            </select> */}
            <TiSelect
                options={countries}
                onChange={(selectedOptions) =>
                    addTimezoneList(selectedOptions.name as TimezoneName)
                }
            />

            {/* <Command>
                <CommandInput
                    value={command}
                    onValueChange={setCommand}
                    placeholder="Type a command or search..."
                />

                {command ? (
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Add Timezones">
                            {countries.map((country, index) => {
                                return (
                                    <CommandItem
                                        key={country.name}
                                        onSelect={(value) =>
                                            addTimezoneList(
                                                value as TimezoneName
                                            )
                                        }
                                    >
                                        {country.name}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                ) : null}
            </Command> */}
        </div>
    )
}

export default TimezoneDropdown
