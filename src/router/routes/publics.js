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
];

export default Private;
