import AnalogueClock from '@/components/clock/AnalogueClock'
import DigitalClock from '@/components/clock/DigitalClock'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { cn } from '@/lib/utils'

const Clock = ({ className }: { className?: string }) => {
    const { clockView } = useAppSelector((state) => state.clock)

    return (
        <div
            className={cn(
                `flex-1 flex items-center justify-center text-5xl font-mono`,
                className
            )}
        >
            {clockView === 'digital' ? <DigitalClock /> : <AnalogueClock />}
        </div>
    )
}

export default Clock
