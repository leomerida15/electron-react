const { app, ...remote } = window.require('@electron/remote');

const Api = async (rout, func, body) => {
	try {
		alert('hola');
		const data = {
			headers: { rout, func, token: localStorage.getItem('token') },
			body,
		};

		const resp = remote.require('../../public/router')(rout, func, data);

		return resp;
	} catch (err) {
		return err;
	}
};

module.exports = Api;
