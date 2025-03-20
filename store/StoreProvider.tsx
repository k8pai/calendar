'use client'

import { Toaster } from '@/components/ui/sonner'
import ShortcutProvider from '@/store/ShortcutProvider'
import { useTheme } from 'next-themes'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToasterProps } from 'sonner'
import { store } from './store'
const StoreProvider = ({ children }: { children: ReactNode }) => {
    const { resolvedTheme } = useTheme()
    return (
        <Provider store={store}>
            <ShortcutProvider>{children}</ShortcutProvider>
            <Toaster
                richColors
                theme={resolvedTheme as ToasterProps['theme']}
            />
        </Provider>
    )
}

export default StoreProvider
