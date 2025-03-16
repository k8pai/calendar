import { Button } from '@/components/ui/button'
import { useCalendarAction } from '@/hooks/useCalendarActions'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

const Actions = () => {
    return <div></div>
}

export const PrevButton = () => {
    const { previous } = useCalendarAction()
    return (
        <Button
            className="group transition-all cursor-pointer"
            variant="outline"
            size="icon"
            onClick={() => previous()}
        >
            <ChevronLeft className="group-hover:scale-110" />
        </Button>
    )
}

export const NextButton = () => {
    const { next } = useCalendarAction()
    return (
        <Button
            className="group transition-all cursor-pointer"
            variant="outline"
            size="icon"
            onClick={() => next()}
        >
            <ChevronRight className="group-hover:scale-110" />
        </Button>
    )
}

export const ResetButton = () => {
    const { reset } = useCalendarAction()
    return (
        <Button
            className="group transition-all cursor-pointer"
            variant="outline"
            size="icon"
            onClick={() => reset()}
        >
            <RotateCcw className="group-hover:scale-110" />
        </Button>
    )
}

export default Actions
