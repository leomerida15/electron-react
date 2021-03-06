import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const Alerts = withReactContent(Swal);

export default Alerts.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
	},
	customClass: { container: 'top-alert' },
});
