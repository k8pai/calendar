'use client'

import { useAppSelector } from '@/hooks/useTypedSelectors'
import { motion } from 'motion/react'
import React from 'react'

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
    const { timezone } = useAppSelector((state) => state.clock)

    return (
        <div className="mb-4 flex justify-start items-center space-x-2 px-4 font-semibold">
            <motion.span
                key={timezone}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 50,
                    delay: 0.5,
                }}
                className="text-sm font-mono text-gray-700"
            >
                {timezone}
            </motion.span>
        </div>
    )
}

export default Footer
