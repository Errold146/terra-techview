export type NavLink = {
    name: string
    href: string
    icon: 'FiSettings' | 'FiDollarSign' | 'FiMessageCircle' | 'FiGrid'
}

export const links: NavLink[] = [
    {
        name: 'How it Works',
        href: '#how-it-works',
        icon: 'FiSettings',
    },
    {
        name: 'Pricing',
        href: '#pricing',
        icon: 'FiDollarSign',
    },
    {
        name: 'Contact',
        href: '#cta',
        icon: 'FiMessageCircle',
    },
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: 'FiGrid',
    },
]
