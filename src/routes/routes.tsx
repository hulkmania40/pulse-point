import Timeline from '@/components/Timeline/Timeline';
import Homepage from '../components/Homepage/Homepage';

import type { RouteObject } from "react-router-dom";
import TimelineForm from '@/components/TimelineForm/TimelineForm';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Homepage />,
	},
	{
		path: '/event/:id',
		element: <Timeline />,
	},
	{
		path: '/add',
		element: <TimelineForm />,
	},
];

export default routes;
