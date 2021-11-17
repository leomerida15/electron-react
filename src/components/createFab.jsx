import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

const createFab = ({ action, config, children }) => {
	return (
		<Box sx={{ '& > :not(style)': { m: 1 } }}>
			config?
			<Fab onClick={action} {...config}>
				{children ? children : <AddIcon />}
			</Fab>
			:{' '}
			<Fab onClick={action} size='medium' color='primary' className={'fab'} aria-label='add'>
				{children ? children : <AddIcon />}
			</Fab>
		</Box>
	);
};

createFab.propTypes = {
	action: PropTypes.func.isRequired,
	config: PropTypes.any,
};

export default createFab;
