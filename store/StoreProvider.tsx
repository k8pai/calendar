'use client'

import { Toaster } from '@/components/ui/sonner'
import ShortcutProvider from '@/store/ShortcutProvider'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

const StoreProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <ShortcutProvider>{children}</ShortcutProvider>
            <Toaster />
        </Provider>
    )
}

export default StoreProvider
