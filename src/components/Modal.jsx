import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import PropTypes from 'prop-types';
import CreateForm from './createForm';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	border: '2px solid #fff',
	borderRadius: 2,
	boxShadow: 24,
	px: 4,
	py: 4,
};

const ModalWin = ({ open, onClose, form, children }) => {
	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={onClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<Box sx={style}> {form ? <CreateForm {...form} /> : children}</Box>
				</Fade>
			</Modal>
		</div>
	);
};

ModalWin.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	form: PropTypes.any,
	children: PropTypes.element,
};

export default ModalWin;
