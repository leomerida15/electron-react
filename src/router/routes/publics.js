import Home from '../../pages/Home/index';

const Private = [
	{
		path: '/',
		component: Home,
		meta: { auth: false },
	},
	{
		path: '/registro',
		component: Home,
		meta: { auth: false },
	},
	// { path: '*', component: Home, meta: { auth: true } },
];

export default Private;
