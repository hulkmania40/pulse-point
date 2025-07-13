import Timeline from '@/components/Timeline/Timeline';
import Homepage from '../components/Homepage/Homepage';
import TimelineForm from '@/components/Timeline/TimelineForm';
import PrivateRoute from '@/components/PrivateRoute';

import type { RouteObject } from 'react-router-dom';
import Unauthorized from '@/components/Unauthorized';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Homepage />,
	},
	{
		path: '/event/:id',
		element: (
			<PrivateRoute roles={['viewer', 'editor', 'admin']}>
				<Timeline />
			</PrivateRoute>
		),
	},
	{
		path: '/add',
		element: (
			<PrivateRoute roles={['editor', 'admin']}>
				<TimelineForm />
			</PrivateRoute>
		),
	},
	{
		path: '/unauthorized',
		element: <Unauthorized />,
	}
];

export default routes;
