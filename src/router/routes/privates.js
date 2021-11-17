import Dash from '../../pages/private/Dash';

const Public = [
	{
		path: '/dash',
		component: Dash,
		meta: { auth: true },
	},
	{
		path: '/dash/*',
		component: Dash,
		meta: { auth: true },
	},
	// { path: '*', component: Dash, meta: { auth: true } },
];

export default Public;
