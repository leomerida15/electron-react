import Alert from './Alert';

const { app, ...remote } = window.require('@electron/remote');

const Api = async (rout, func, body, offAlert) => {
	try {
		console.log(rout, func, body);

		const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token'))[0] : '';
		const data = { headers: { rout, func, token }, body };

		// console.log('route', `./Api/functions/${rout}.js`);

		const resp = await (async () => {
			if (body) {
				const action = remote.require(`./Api/functions/${rout}.js`);
				return action[func](data);
			} else {
				const action = remote.require(`./Api/functions/${rout}.js`);
				return action[func](data);
			}
		})();

		console.log('resp', resp);
		if (!resp.status) throw resp.err;

		if (offAlert) Alert.fire({ icon: 'success', title: resp.message });

		return resp;
	} catch (err) {
		if (offAlert) Alert.fire({ icon: 'error', title: err.message });

		console.log('rout, func', rout, func);
		console.log('err', err);

		return { icon: 'error', title: err.message };
	}
};

export default Api;
