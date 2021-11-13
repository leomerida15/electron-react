import CreateForm from '../createForm';
import * as yup from 'yup';
import { InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';

const schema = yup
	.object({
		name: yup.string().required(),
		email: yup.string().required(),
		password: yup.string().required(),
		confirPass: yup.string().required(),
	})
	.required();

const Register = () => {
	const Action = async (body) => {
		try {
			const { password, confirPass } = body;

			if (password !== confirPass) {
				// eslint-disable-next-line no-throw-literal
				throw {
					title: 'Error',
					text: 'Sus contraseñas no son inguales',
					icon: 'error',
				};
			}

			await axios.post('/auth/register', body);
		} catch (err) {}
	};

	const fromData = [
		{
			type: 'email',
			name: 'email',
			label: 'Correo',
			rules: (value) => {
				return {
					required: true,
				};
			},
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<EmailIcon />
					</InputAdornment>
				),
			},
		},
		{
			type: 'password-see',
			name: 'password',
			label: 'Contraseña',
			rules: (value) => ({
				required: true,
			}),
		},
		{
			type: 'password',
			name: 'confirPass',
			label: 'Repetir Contraseña',
			rules: (value) => ({
				required: true,
			}),
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<LockIcon />
					</InputAdornment>
				),
			},
		},
	];

	return <CreateForm buttonText='crear' Action={Action} schema={schema} fromInput={fromData} />;
};

export default Register;
