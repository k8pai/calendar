'use client'

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarLabel,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from '@/components/ui/menubar'
import { useCalendarAction } from '@/hooks/useCalendarActions'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const Menu = () => {
    const { viewMode } = useAppSelector((state) => state.calendar)
    const {
        previous,
        next,
        setDayView,
        setWeekView,
        setYearView,
        setMonthView,
        setWeekendsView,
        toggleCommandFlag,
        reset,
    } = useCalendarAction()

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
            previous()
        } else if (event.key === 'ArrowRight') {
            next()
        }
        event.stopPropagation()
    }

    return (
        <div>
            <Menubar className="w-fit" onKeyDownCapture={handleKeyDown}>
                {/* <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent onKeyDown={handleKeyDown}>
                        <MenubarItem
                            onMouseEnter={(e) => e.currentTarget.focus()}
                        >
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                            onMouseEnter={(e) => e.currentTarget.focus()}
                        >
                            New Window
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem
                            onMouseEnter={(e) => e.currentTarget.focus()}
                        >
                            Share
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem
                            onMouseEnter={(e) => e.currentTarget.focus()}
                        >
                            Print
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu> */}

                <MenubarMenu>
                    <MenubarTrigger>Shortcuts</MenubarTrigger>
                    <MenubarContent onKeyDown={handleKeyDown}>
                        <MenubarLabel>Views</MenubarLabel>
                        <MenubarItem onClick={() => setYearView()}>
                            Year View <MenubarShortcut>y</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem onClick={() => setMonthView()}>
                            Month View <MenubarShortcut>m</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem onClick={() => setWeekView()}>
                            Week View <MenubarShortcut>w</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem onClick={() => setDayView()}>
                            Day View <MenubarShortcut>d</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem onClick={() => setWeekendsView()}>
                            Weekends <MenubarShortcut>d</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarLabel>Navigation</MenubarLabel>
                        <MenubarItem onClick={() => toggleCommandFlag()}>
                            Toggle Search
                            <MenubarShortcut>⌘ + k </MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger>Goto</MenubarTrigger>
                    <MenubarContent onKeyDown={handleKeyDown}>
                        <MenubarItem onClick={() => previous()}>
                            Previous {viewMode}{' '}
                            <MenubarShortcut>
                                <ArrowLeft />
                            </MenubarShortcut>
                        </MenubarItem>

                        <MenubarItem onClick={() => next()}>
                            Next {viewMode}{' '}
                            <MenubarShortcut>
                                <ArrowRight />
                            </MenubarShortcut>
                        </MenubarItem>

                        <MenubarItem onClick={() => reset()}>
                            Today
                            <MenubarShortcut>r</MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}

export default Menu
