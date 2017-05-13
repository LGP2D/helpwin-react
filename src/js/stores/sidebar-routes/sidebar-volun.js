import React from 'react';

const routes = [
    {
        href: '/dashboard',
        class: 'active',
        icon: 'ti ti-home',
        name: 'Home'
    },
    {
        href: '/dashboard/volunteerProfile',
        class: 'active',
        icon: 'ti ti-user',
        name: 'Profile'
    },
    {
        href: '/dashboard/proposals-volunteer',
        class: 'active',
        icon: 'ti ti-user',
        name: 'Volunteering Proposals'
    },
    {
        href: '/dashboard/vouchers',
        icon: 'ti ti-medall',
        name: 'Vouchers'
    }
];

export default routes;
