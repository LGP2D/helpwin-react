import React from 'react';

const routes = [
    {
        href: '/dashboard',
        class: 'active',
        icon: 'ti ti-home',
        name: 'Home'
    },
    {
        href: '/dashboard/list-volunteers/:id',
        icon: 'ti ti-crown',
        name: 'Volunteers'
    },
    {
        href: '/dashboard/proposals-volunteer/:id',
        icon: 'ti ti-bolt-alt',
        name: 'Candidates'
    },
];

export default routes;
