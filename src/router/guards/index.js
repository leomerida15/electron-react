export const Auth = (to, from, next) => {
	if (to.meta.auth) {
		if (localStorage.getItem('token')) next();
		else next.redirect('/');
	} else {
		if (localStorage.getItem('token')) next.redirect('/dash');
		else next();
	}
};
