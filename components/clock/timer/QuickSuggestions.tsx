import { Button } from '@/components/ui/button'
import { useClockAction } from '@/hooks/useClockActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { quickSuggestionType } from '@/types/clockTypes'
import { motion } from 'motion/react'

const quickSuggestions: quickSuggestionType[] = [
    { label: '30 Seconds', value: 30, type: 's' },
    { label: '1 Minute', value: 1, type: 'm' },
    { label: '3 Minute', value: 3, type: 'm' },
    { label: '5 Minute', value: 5, type: 'm' },
    { label: '15 Minute', value: 15, type: 'm' },
    { label: '30 Minute', value: 30, type: 'm' },
    { label: '1 Hour', value: 1, type: 'h' },
]

const QuickSuggestions = () => {
    const {
        timerFocusOn,
        timer: { isRunning, time: timeUnits, duration },
    } = useAppSelector((state) => state.clock)
    const { setTimerFocusUnit, updateTimerConfigs } = useClockAction()
    const timerUnitMap: Record<typeof timerFocusOn, keyof typeof timeUnits> = {
        h: 'hour',
        m: 'minute',
        s: 'second',
    }
    const handleQuickSuggestionClick = (suggestion: quickSuggestionType) => {
        updateTimerConfigs({
            time: {
                ...timeUnits,
                hour: 0,
                minute: 0,
                second: 0,
                [timerUnitMap[suggestion.type]]: suggestion.value,
            },
            duration: { hour: 0, minute: 0, second: 0 },
        })
    }
    return (
        <motion.div className="flex items-center justify-center gap-5 text-xs">
            {quickSuggestions.map((suggestion, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                    <Button
                        variant={'outline'}
                        className="px-3 py-1.5 rounded-full cursor-pointer shadow-xs bg-secondary-foreground hover:shadow-md"
                        onClick={() => handleQuickSuggestionClick(suggestion)}
                    >
                        {suggestion.label}
                    </Button>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default QuickSuggestions
