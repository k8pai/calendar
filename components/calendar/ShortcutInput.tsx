import { Input } from '@/components/ui/input'
import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { isValid, parse } from 'date-fns'
import { motion } from 'motion/react'
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type ShortcutInputProps = {
    listening: boolean
}

const dateFormats = [
    'd',
    'dd',
    'd MM',
    'd MMM',
    'd MMMM',
    'dd MM',
    'dd MMM',
    'dd MMMM',
    'MM',
    'MMM',
    'MMMM',
    'uuuu',
    'yyyy',
    'd MM uuuu',
    'd MMM uuuu',
    'd MMMM uuuu',
    'dd MM uuuu',
    'dd MMM uuuu',
    'dd MMMM uuuu',
]
const ShortcutInput = ({ listening }: ShortcutInputProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [searchable, setSearchable] = useState<string>('')

    const { setDate, setKeystroke } = useCalendarAction()

    const { listening: listen } = useAppSelector((state) => state.keystroke)
    const { selectedDate } = useAppSelector((state) => state.calendar)

    useEffect(() => {
        if (listen && inputRef.current) {
            inputRef.current.focus()
            setSearchable('')
        } else {
            inputRef.current?.blur()
        }
    }, [listen])

    useEffect(() => {
        console.log('value of searchable', searchable)
    }, [searchable])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchable(e.target.value)

        let date = parse(searchable, 'dd/MM/uuuu', new Date())
        // if()
        console.log(
            'date : ',
            date,
            new Date(date),
            typeof date,
            isValid(new Date(searchable)),
            isValid(date)
        )
    }

    const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log('search : ', e)
        if (e.key === 'Enter') {
            // let date = parse(searchable, 'dd/MM/uuuu', new Date())
            // let date = new Date(searchable)
            let currDate = selectedDate

            let validDate: Date | null = null
            for (let formatString of dateFormats) {
                const parsed = parse(
                    searchable,
                    formatString,
                    new Date(currDate)
                )
                if (isValid(parsed)) {
                    validDate = parsed
                    break
                }
            }

            if (validDate) {
                setDate(validDate)
                inputRef.current?.blur()
                setKeystroke(false)
            } else {
                toast('Date is not valid.')
            }
        }
    }

    console.log('this rendered... ')
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: listening ? 1 : 0,
                top: listening ? '50%' : '50%',
                transform: `${
                    listening ? 'translateY(-50%)' : 'translateY(0%)'
                }`,
            }}
            transition={{ duration: 0.2 }}
            className="absolute"
        >
            <Input
                ref={inputRef}
                type="text"
                placeholder="dd/MM/yyyy"
                className="w-[200px]"
                value={searchable}
                autoFocus={true}
                onKeyDown={handleSearch}
                onChange={handleChange}
            />
        </motion.div>
    )
}

export default ShortcutInput
