'use client'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { calendarTypes } from '@/lib/constants'

export const SwitchCalendar = () => {
    const { calendarType } = useAppSelector((state) => state.calendar)
    const { setCalendarType } = useCalendarAction()

    const handleSelectChange = (value: string) => {
        // Implement your custom logic to set the calendar type
        // For example, call setCalendarType('gregorian') or setCalendarType('julian')
        if (value === 'gregorian' || value === 'julian') {
            setCalendarType(value)
        }
    }

    return (
        <Select onValueChange={handleSelectChange} defaultValue={calendarType}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a Calendar" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Calendars</SelectLabel>

                    {calendarTypes.map((el) => {
                        return (
                            <SelectItem key={el.value} value={el.value}>
                                {el.label}
                            </SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
