import CreateForm from '../createForm';
import * as yup from 'yup';
import { InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import Api from '../../hook/Api';
import { useHistory } from 'react-router';

const schema = yup
	.object({
		email: yup.string().required(),
		password: yup.string().required(),
	})
	.required();

const Login = () => {
	const History = useHistory();
	const Action = async (body) => {
		try {
			// console.log('body Form', body);

			const resp = await Api('Auth', 'login', body);
			if (!resp.status) throw new Error('Error');

			// console.log('resp', resp);
			const tokensJSON = localStorage.getItem('tokens') || `[]`;

			const tokensJS = JSON.parse(tokensJSON);

			tokensJS.push(resp.token);

			const tokensSTIRNG = JSON.stringify(tokensJS);

			localStorage.setItem('token', tokensSTIRNG);

			History.push('/dash');
		} catch (err) {
			console.error('err');
			console.log('err', err);
		}
	};

	const fromData = [
		{
			type: 'text',
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
			type: 'password',
			name: 'password',
			label: 'Contraseña',
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

export default Login;
