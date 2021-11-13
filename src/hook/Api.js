import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const Alert = withReactContent(Swal);

Alert.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
	},
});

const { app, ...remote } = window.require('@electron/remote');

const Api = async (rout, func, body) => {
	try {
		const data = {
			headers: { rout, func, token: localStorage.getItem('token') },
			body,
		};

		const resp = body
			? await remote.require(`./functions/${rout}.js`)[func](data)
			: await remote.require(`./functions/${rout}.js`)[func]();

		console.log('resp', resp);
		if (!resp.status) throw resp.err;

		Alert.fire({ icon: 'success', title: resp.message });

		return resp;
	} catch (err) {
		Alert.fire({ icon: 'error', title: err.message });

		return err;
	}
};

export default Api;
