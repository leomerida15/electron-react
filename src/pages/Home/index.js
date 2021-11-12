import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Auth from '../../components/auth';

const Home = () => {
	return (
		<div className='s-center'>
			<div className='s-50 s-to-center'>
				<Box>
					<br />
					<br />
					<br />
					<Card variant='outlined'>
						{' '}
						<CardContent>{<Auth type={'login'} />}</CardContent>
					</Card>
				</Box>
			</div>
		</div>
	);
};

export default Home;
