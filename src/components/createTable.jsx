import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { DataGridPro, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid-pro';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';

function escapeRegExp(value) {
	return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
	(theme) =>
		createStyles({
			root: {
				padding: theme.spacing(0.5, 0.5, 0),
				justifyContent: 'space-between',
				display: 'flex',
				alignItems: 'flex-start',
				flexWrap: 'wrap',
			},
			textField: {
				[theme.breakpoints.down('xs')]: {
					width: '100%',
				},
				margin: theme.spacing(1, 0.5, 1.5),
				'& .MuiSvgIcon-root': {
					marginRight: theme.spacing(0.5),
				},
				'& .MuiInput-underline:before': {
					borderBottom: `1px solid ${theme.palette.divider}`,
				},
			},
		}),
	{ defaultTheme },
);

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

const QuickSearchToolbar = (props) => {
	const classes = useStyles();

	return (
		<div>
			<br />
			<div className={classes.root}>
				<div>
					<GridToolbarFilterButton />
					<GridToolbarDensitySelector />
				</div>

				<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
					<SearchIcon fontSize='large' sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
					<TextField
						variant='outlined'
						value={props.value}
						onChange={props.onChange}
						label={'Buscar'}
						className={classes.textField}
						InputProps={{
							endAdornment: (
								<IconButton
									title='Clear'
									aria-label='Clear'
									size='small'
									style={{ visibility: props.value ? 'visible' : 'hidden' }}
									onClick={props.clearSearch}>
									<ClearIcon fontSize='small' />
								</IconButton>
							),
						}}
					/>{' '}
				</Box>
			</div>
		</div>
	);
};

QuickSearchToolbar.propTypes = {
	clearSearch: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
};

const CreateTable = (prop) => {
	const { columns, actions } = prop;

	const [searchText, setSearchText] = useState('');
	const [rows, setRows] = useState(prop.rows);

	const requestSearch = (searchValue) => {
		setSearchText(searchValue);
		const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
		const filteredRows = prop.rows.filter((row) => {
			return Object.keys(row).some((field) => {
				return searchRegex.test(row[field].toString());
			});
		});
		setRows(filteredRows);
	};

	useEffect(() => {
		setRows(prop.rows);
	}, [prop.rows]);

	const ColumsCreate = (columns, actions) => {
		if (!actions) return columns;

		const colsAdd = columnsActions(actions);

		return columns.concat(colsAdd);
	};

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGridPro
				components={{ Toolbar: QuickSearchToolbar }}
				rows={rows}
				columns={ColumsCreate(columns, actions)}
				componentsProps={{
					toolbar: {
						value: searchText,
						onChange: (event) => requestSearch(event.target.value),
						clearSearch: () => requestSearch(''),
					},
				}}
			/>
		</div>
	);
};

CreateTable.propTypes = {
	rows: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	actions: PropTypes.any,
};

export default CreateTable;
