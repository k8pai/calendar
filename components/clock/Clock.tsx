import AnalogueClock from '@/components/clock/AnalogueClock'
import DigitalClock from '@/components/clock/DigitalClock'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'

const Clock = ({ className }: { className?: string }) => {
    const { clockType } = useAppSelector((state) => state.clock)

    return (
        <div
            className={cn(
                `flex-1 flex items-center justify-center text-5xl font-mono`,
                className
            )}
        >
            <AnimatePresence>
                {clockType === 'digital' ? (
                    // <motion.div
                    //     key={'1'}
                    //     // initial={{
                    //     //     opacity: 0,
                    //     //     scale: 0,
                    //     // }}
                    //     exit={{
                    //         opacity: 0,
                    //         scale: 0,
                    //         transition: { duration: 0.5 },
                    //         transform: 'translateY(500px)',
                    //     }}
                    //     animate={{
                    //         opacity: 1,
                    //         scale: 1,
                    //         transition: { duration: 0.5 },
                    //     }}
                    //     // transition={{ duration: 0.25 }}
                    //     // variants={{
                    //     //     initial: { opacity: 0, scale: 1 },
                    //     //     exit: { opacity: 1, scale: 0 },
                    //     //     animate: { opacity: 1, scale: 1 },
                    //     // }}
                    // >
                    <DigitalClock key={'1'} />
                ) : (
                    // </motion.div>
                    <motion.div
                        key={'1'}
                        initial={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            // transition: { duration: 0.5 },
                        }}
                    >
                        <AnalogueClock />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Clock
