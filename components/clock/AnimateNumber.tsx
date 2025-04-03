import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const DIGITS = Array.from({ length: 10 }, (_, i) => i) // Constant digits 0-9

type AnimateNumberProps = {
    initialNumber: number
    padStart?: number
    padEnd?: number
}

export default function AnimateNumber({
    initialNumber,
    padStart = 0,
    padEnd = 0,
}: AnimateNumberProps) {
    const formatNumber = (num: number) => {
        let str = num.toString()
        if (padStart > 0) str = str.padStart(padStart, '0')
        if (padEnd > 0) str = str.padEnd(padEnd, '0')
        return str.split('') // Convert to an array of characters
    }

    const [number, setNumber] = useState<Array<string>>(
        formatNumber(initialNumber)
    )

    useEffect(() => {
        const newDigits = formatNumber(initialNumber)
        const lengthDiff = newDigits.length - number.length

        setNumber(newDigits)
    }, [initialNumber, padStart, padEnd])

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative w-auto h-16 overflow-hidden flex justify-center space-x-1 px-2">
                {number.map((digit, i) => (
                    <motion.div
                        key={number.length - i}
                        className="relative w-8"
                    >
                        <motion.div
                            className="absolute flex flex-col items-center"
                            animate={{ y: -digit * 64 }}
                            transition={{
                                type: 'spring',
                                stiffness: 100,
                                damping: 15,
                            }}
                        >
                            {DIGITS.map((n, i) => (
                                <div
                                    key={n}
                                    className="h-16 flex items-center justify-center text-5xl font-bold w-8"
                                >
                                    {n}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
            {/* <div className="flex space-x-2">
                <Button onClick={handlePrev}>Prev</Button>
                <Button onClick={handleNext}>Next</Button>
            </div> */}
        </div>
    )
}
