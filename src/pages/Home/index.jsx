import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Auth from '../../components/auth';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
	const { pathname } = useLocation();
	const type = pathname !== '/' ? 'register' : 'login';

	return (
		<div className='s-center'>
			<div className='s-50 s-to-center'>
				<Box>
					<br />
					<br />
					<h1>{pathname}</h1>
					<br />
					<Card variant='outlined'>
						{' '}
						<CardContent>{<Auth type={type} />}</CardContent>
						<br />
						{/* <Link to='register'> */}
						{pathname !== '/' ? (
							<Link to={'/'}>
								<p>Login</p>
							</Link>
						) : (
							<Link to={'/registro'}>
								<p>Registro</p>
							</Link>
						)}
						{/* </Link> */}
					</Card>
				</Box>
			</div>
		</div>
	);
};

export default Home;
