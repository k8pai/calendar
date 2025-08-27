'use client'

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarShortcut,
    MenubarTrigger,
} from '@/components/ui/menubar'
import { useClockAction } from '@/hooks/useClockActions'

const Menu = () => {
    const { switchClockMode } = useClockAction()

    return (
        <div>
            <Menubar className="w-fit" onKeyDownCapture={() => {}}>
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

                {/* <MenubarMenu>
                    <MenubarTrigger>Shortcuts</MenubarTrigger>
                    <MenubarContent onKeyDown={() => {}}>
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
                            Weekends
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarLabel>Navigation</MenubarLabel>
                        <MenubarItem onClick={() => toggleCommandFlag()}>
                            Toggle Search
                            <MenubarShortcut>⌘ + k </MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu> */}

                <MenubarMenu>
                    <MenubarTrigger>Goto</MenubarTrigger>
                    <MenubarContent onKeyDown={() => {}}>
                        <MenubarItem onClick={() => switchClockMode('timer')}>
                            Timer{' '}
                            <MenubarShortcut>
                                {/* <Hourglass /> */}T
                            </MenubarShortcut>
                        </MenubarItem>

                        <MenubarItem onClick={() => switchClockMode('clock')}>
                            Clock{' '}
                            <MenubarShortcut>
                                {/* <Clock /> */}C
                            </MenubarShortcut>
                        </MenubarItem>

                        {/* <MenubarItem
                            onClick={() => switchClockMode('stopwatch')}
                        >
                            Stopwatch
                            <MenubarShortcut>
                                <Timer />
                            </MenubarShortcut>
                        </MenubarItem> */}
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}

export default Menu
