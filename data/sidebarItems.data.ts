"use client"

import { HouseIcon, VideoIcon, CalendarBlankIcon, MagnifyingGlassIcon, GearSixIcon, BellIcon } from '@phosphor-icons/react'

export const sidebarItems = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: HouseIcon,
    },
    {
        title: 'Interviews',
        url: '/dashboard/interviews',
        icon: VideoIcon,
    },
    {
        title: 'Calendar',
        url: '/dashboard/calendar',
        icon: CalendarBlankIcon,
    },
    {
        title: 'Notifications',
        url: '/dashboard/notifications',
        icon: BellIcon,
    },
    {
        title: 'Search',
        url: '/dashboard/search',
        icon: MagnifyingGlassIcon,
    },
    {
        title: 'Settings',
        url: '/dashboard/settings',
        icon: GearSixIcon,
    },
]
