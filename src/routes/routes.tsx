import Timeline from '@/components/Timeline/Timeline';
import Homepage from '../components/Homepage/Homepage';
import TimelineForm from '@/components/Timeline/TimelineForm';
import PrivateRoute from '@/components/PrivateRoute';

import type { RouteObject } from 'react-router-dom';
import Unauthorized from '@/components/Unauthorized';
import { RoleType } from '@/common/constants';
import Profile from '@/components/pages/Profile';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Homepage />,
	},
	{
		path: '/event/:id',
		element: (
			<PrivateRoute roles={[RoleType.ADMIN, RoleType.EDITOR, RoleType.VIEWER]}>
				<Timeline />
			</PrivateRoute>
		),
	},
	{
		path: '/add',
		element: (
			<PrivateRoute roles={[RoleType.ADMIN, RoleType.EDITOR]}>
				<TimelineForm />
			</PrivateRoute>
		),
	},
	{
		path: '/me',
		element: (
			<PrivateRoute roles={[RoleType.ADMIN, RoleType.EDITOR, RoleType.VIEWER]}>
				<Profile />
			</PrivateRoute>
		),
	},
	{
		path: '/unauthorized',
		element: <Unauthorized />,
	}
];

export default routes;
