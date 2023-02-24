import React from 'react';
const UsersContainer = React.lazy(() => import('../features/userManager'));
const RolesContainer = React.lazy(() => import('../features/role'));
const DatabaseContainer = React.lazy(() => import('../features/Database'));

const routes = [
  {
    path: '/users/*',
    name: 'Users',
    element: UsersContainer,
  },
  {
    path: '/roles/*',
    name: 'Roles',
    element: RolesContainer,
  },
  {
    path: '/database/*',
    name: 'Database',
    element: DatabaseContainer,
  },
];

export default routes;
