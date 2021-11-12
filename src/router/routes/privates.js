import Dash from '../../pages/private/Dash';

const Public = [
	{
		path: '/dash',
		component: Dash,
		meta: { auth: true },
	},
	{
		path: '/category',
		component: Dash,
		meta: { auth: true },
	},
	{
		path: '/category/create',
		component: Dash,
		meta: { auth: true },
	},
	{
		path: '/category/edit/:id',
		component: Dash,
		meta: { auth: true },
	},
];

export default Public;
