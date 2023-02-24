import React from 'react';
import DistancesContainer from '../features/distances';
import DriversContainer from '../features/drivers';
import RequestsContainer from '../features/requests';
import VehiclesContainer from '../features/vehicles';
import VendorsContainer from '../features/vendors';

const CustomersContainer = React.lazy(() => import('../features/customers'));
const PointsContainer = React.lazy(() => import('../features/points'));

const routes = [
  {
    path: '/customers',
    name: 'Customers',
    // permission: "System.Customers",
    element: CustomersContainer,
  },
  {
    path: '/points',
    name: 'Points',
    // permission: "System.Points",
    element: PointsContainer,
  },
  {
    path: '/distances',
    name: 'Distances',
    // permission: "System.Points",
    element: DistancesContainer,
  },
  {
    path: '/drivers',
    name: 'Drivers',
    // permission: "System.Points",
    element: DriversContainer,
  },
  {
    path: '/requests',
    name: 'Requests',
    // permission: "System.Points",
    element: RequestsContainer,
  }, 
  {
    path: '/vehicles',
    name: 'Vehicles',
    // permission: "System.Points",
    element: VehiclesContainer,
  }, {
    path: '/vendors',
    name: 'Vendors',
    // permission: "System.Points",
    element: VendorsContainer,
  },
];

export default routes;
