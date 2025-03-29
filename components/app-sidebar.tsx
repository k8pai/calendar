'use client'

import {
    IconCalendar,
    IconCamera,
    IconDatabase,
    IconFileAi,
    IconFileDescription,
    IconFileWord,
    IconHelp,
    IconReport,
    IconSearch,
    IconSettings,
} from '@tabler/icons-react'
import * as React from 'react'

import Logo from '@/components/Logo'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

export const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        // {
        //     title: 'Dashboard',
        //     url: '#',
        //     icon: IconDashboard,
        // },
        {
            title: 'Calendar',
            url: '/calendar',
            icon: IconCalendar,
        },
        // {
        //     title: 'Lifecycle',
        //     url: '#',
        //     icon: IconListDetails,
        // },
        // {
        //     title: 'Analytics',
        //     url: '#',
        //     icon: IconChartBar,
        // },
        // {
        //     title: 'Projects',
        //     url: '#',
        //     icon: IconFolder,
        // },
        // {
        //     title: 'Team',
        //     url: '#',
        //     icon: IconUsers,
        // },
    ],
    navClouds: [
        {
            title: 'Capture',
            icon: IconCamera,
            isActive: true,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Proposal',
            icon: IconFileDescription,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Prompts',
            icon: IconFileAi,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: 'Settings',
            url: '#',
            icon: IconSettings,
        },
        {
            title: 'Get Help',
            url: 'https://k8pai.dev/notes/calendar-updates',
            icon: IconHelp,
        },
        {
            title: 'Search',
            url: '#',
            icon: IconSearch,
        },
    ],
    documents: [
        {
            name: 'Data Library',
            url: '#',
            icon: IconDatabase,
        },
        {
            name: 'Reports',
            url: '#',
            icon: IconReport,
        },
        {
            name: 'Word Assistant',
            url: '#',
            icon: IconFileWord,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <div className="flex items-center gap-2">
                                <Logo />
                                {/* <span className="text-base font-semibold">
                                    Pai
                                </span> */}
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavDocuments items={data.documents} /> */}
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            {/* <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter> */}
        </Sidebar>
    )
}
