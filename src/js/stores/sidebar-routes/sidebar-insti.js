import React from 'react';

const routes = [
    {
        href: '/dashboard',
        class: 'active',
        icon: 'ti ti-home',
        name: 'Home'
    },
    {
        href: '/dashboard/institutionProps',
        icon: 'ti ti-crown',
        name: 'Proposals'
    },
    /*{
        href: '/dashboard/proposals-volunteer/:id',
        icon: 'ti ti-bolt-alt',
        name: 'Candidates'
    },*/
    {
        href: '/dashboard/insert-action',
        icon: 'ti ti-bolt-alt',
        name: 'Insert Actions'
    }
];

export default routes;
