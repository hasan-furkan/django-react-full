import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/dashboards/DefaultDashbord'));
const Example = lazy(() => import('../pages/Example'));
export const routes = [
  // dashboard
  { path: `/dashboard`, Component: <Dashboard /> },
  { path: `/example`, Component: <Example /> },
];
