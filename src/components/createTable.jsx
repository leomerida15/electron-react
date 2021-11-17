import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import { DataGridPro } from '@mui/x-data-grid-pro';

import Fab from '@mui/material/Fab';

import PropTypes from 'prop-types';

const columnsActions = (actions) => {
	const { remove, print, edit } = actions;
	const renderCell = (params) => {
		const { api } = params;
		if (!actions.print) {
			return (
				<strong>
					<Fab size='small' onClick={() => edit(params)} color='primary'>
						<EditIcon />
					</Fab>
					<Fab size='small' onClick={() => remove(params)} color='secondary'>
						<DeleteIcon />
					</Fab>
				</strong>
			);
		} else {
			return (
				<strong>
					<Fab
						size='small'
						onClick={() => {
							// @ts-expect-error
							print(api);
						}}
						color='inherit'>
						<PrintIcon />
					</Fab>
					<Fab size='small' onClick={() => edit(api)} color='primary'>
						<EditIcon />
					</Fab>
					<Fab size='small' onClick={() => remove(api)} color='secondary'>
						<DeleteIcon />
					</Fab>
				</strong>
			);
		}
	};
	return {
		field: 'actions',
		headerName: 'Acciones',
		width: 150,
		renderCell,
	};
};

// document.querySelector(
// 	'#root > div > div > div.MuiBox-root.css-k008qs > main > div:nth-child(3) > div > div.MuiDataGrid-main > div:nth-child(3)',
// ).innerHTML = '';

const CreateTable = ({ rows, columns, actions }) => {
	//
	const ColumsCreate = (columns, actions) => {
		if (!actions) return columns;

		const colsAdd = columnsActions(actions);

		return columns.concat(colsAdd);
	};

	return (
		<div style={{ height: 300, width: '100%' }}>
			<DataGridPro rows={rows} columns={ColumsCreate(columns, actions)} />
		</div>
	);
};

CreateTable.propTypes = {
	rows: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	actions: PropTypes.any,
};

export default CreateTable;
