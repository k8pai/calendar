'use client'

import TimerTrackWrapper from '@/components/clock/TimerTrackWrapper'
import { Toaster } from '@/components/ui/sonner'
import { useTheme } from 'next-themes'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToasterProps } from 'sonner'
import { store } from './store'
const StoreProvider = ({ children }: { children: ReactNode }) => {
    const { resolvedTheme } = useTheme()
    return (
        <Provider store={store}>
            {children}
            <Toaster
                richColors
                theme={resolvedTheme as ToasterProps['theme']}
            />
            <TimerTrackWrapper />
        </Provider>
    )
}

export default StoreProvider
