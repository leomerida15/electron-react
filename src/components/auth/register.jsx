import CreateForm from '../createForm';
import * as yup from 'yup';
import { InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import Api from '../../hook/Api';
import { useHistory } from 'react-router';

const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().required(),
		confirPass: yup.string().required(),
		image: yup.string().required(),
	})
	.required();

const Register = () => {
	const History = useHistory();
	const Action = async (body) => {
		try {
			await Api('Auth', 'login', body);

			History.push('/');
		} catch (err) {
			console.log('err', err);
		}
	};

	const fromData = [
		{
			type: 'file',
			name: 'image',
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
