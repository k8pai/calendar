'use client'

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from '@/components/ui/menubar'
import { useAppSelector } from '@/hooks/useTypedSelectors'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const Menu = () => {
    const { viewMode } = useAppSelector((state) => state.calendar)

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (
            ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(
                event.key
            )
        ) {
            console.log('idhil ind tta...', event.key)
            event.preventDefault() // Prevent focus movement
        }
    }

    return (
        <div>
            <Menubar className="w-fit" onKeyDown={handleKeyDown}>
                <MenubarMenu>
                    <MenubarTrigger data-state>File</MenubarTrigger>
                    <MenubarContent>
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
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger>Shortcuts</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Year View <MenubarShortcut>y</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            Month View <MenubarShortcut>m</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            Week View <MenubarShortcut>w</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            Day View <MenubarShortcut>d</MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger>Goto</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Previous {viewMode}{' '}
                            <MenubarShortcut>
                                <ArrowLeft />
                            </MenubarShortcut>
                        </MenubarItem>

                        <MenubarItem>
                            Next {viewMode}{' '}
                            <MenubarShortcut>
                                <ArrowRight />
                            </MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}

export default Menu
