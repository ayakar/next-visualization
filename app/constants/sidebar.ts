export type NavIcon = 'dashboard' | 'info';

export interface NavItem {
    href: string;
    label: string;
    icon: NavIcon;
}

export interface NavSection {
    label: string;
    items: NavItem[];
}

export const BRAND = {
    name: 'Risk Viz',
    tagline: 'Climate Intel',
};

export const NAV_SECTIONS: NavSection[] = [
    {
        label: 'Explore',
        items: [{ href: '/', label: 'Dashboard', icon: 'dashboard' }],
    },
    {
        label: 'Info',
        items: [{ href: '/about', label: 'About', icon: 'info' }],
    },
];

export const AUTHOR = {
    name: 'Ayaka Rogoza',
    firstName: 'Ayaka',
    avatar: '/assets/ayaka.jpg',
    note: {
        lead: 'Hello! This is',
        tail: 'Thank you for viewing my project!',
    },
};
