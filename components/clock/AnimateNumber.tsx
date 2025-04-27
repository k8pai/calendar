import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const DIGITS = Array.from({ length: 10 }, (_, i) => i) // Constant digits 0-9

type AnimateNumberProps = {
    initialNumber: number
    padStart?: number
    padEnd?: number
    size?: 'sm' | 'md' | 'lg' | 'xl' // new: tailwind size keys
    classNames?: {
        container?: string
        digit?: string
        digitContainer?: string
    }
}

const sizeMap = {
    sm: { height: 48, fontSize: 24 },
    md: { height: 64, fontSize: 32 },
    lg: { height: 80, fontSize: 40 },
    xl: { height: 96, fontSize: 48 },
} as const

export default function AnimateNumber({
    initialNumber,
    padStart = 0,
    padEnd = 0,
    size = 'md',
    classNames = {},
}: AnimateNumberProps) {
    const { height, fontSize } = sizeMap[size]
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
            <div
                className={cn(
                    'relative overflow-hidden flex justify-center px-2',
                    classNames.container
                )}
                style={{ height }}
            >
                {number.map((digit, i) => (
                    <motion.div
                        key={number.length - i}
                        className={cn('relative', classNames.digitContainer)}
                    >
                        <motion.div
                            className="absolute flex flex-col items-center"
                            // animate={{ y: -digit * 64 }}

                            animate={{ y: -parseInt(digit) * height }}
                            transition={{
                                type: 'spring',
                                stiffness: 100,
                                damping: 15,
                            }}
                        >
                            {DIGITS.map((n, i) => (
                                <div
                                    key={n}
                                    className={cn(
                                        'flex h-16 items-center justify-center font-bold w-8',
                                        classNames.digit
                                    )}
                                    style={{
                                        height,
                                        // width: height / 2,
                                        // fontSize,
                                    }}
                                >
                                    {n}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
