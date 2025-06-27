import Timeline from '@/components/Timeline/Timeline';
import Homepage from '../components/Homepage/Homepage';

import type { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/timeline',
    element: <Timeline title='World War - 1'/>,
  },
];

export default routes;
