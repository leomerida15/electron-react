import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

export default function NavBar() {
	return (
		<Box sx={{ display: 'flex' }}>
			{' '}
			<CssBaseline />
			<AppBar position='fixed'>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Home
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
