import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface variants {
    default: string
    destructive: string
    outline: string
    secondary: string
    ghost: string
    link: string
}

export const TooltipWrapper = ({
    value,
    description,
    buttonType,
}: {
    value: string
    description: string
    buttonType: keyof variants
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={buttonType ?? 'outline'}>{value}</Button>
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                    className="bg-background text-primary"
                >
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
