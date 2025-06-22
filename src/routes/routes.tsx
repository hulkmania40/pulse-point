import Homepage from '../components/Homepage';

import type { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Homepage />,
  },
  // {
  //   path: '/post',
  //   element: <Post />,
  // },
];

export default routes;
