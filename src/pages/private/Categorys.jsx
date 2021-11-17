import { useState, useEffect, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../../components/Modal';
import CategoryIcon from '@mui/icons-material/Category';
import { useLocation } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
import * as yup from 'yup';
import CreateForm from '../../components/createForm';
import CreateTable from '../../components/createTable';
import Alert from '../../hook/Alert';

import '../../index.css';

import Api from '../../hook/Api';
// const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const schema = yup
	.object({
		name: yup.string().required(),
	})
	.required();

const Categorys = () => {
	// const History = useHistory();

	const [rows, setRows] = useState([]);

	const Refresh_Rows = async (offAlert) => {
		const resp = await Api('Categorys', 'ALL');
		setRows(resp.info);
	};

	useEffect(() => {
		setTimeout(() => Refresh_Rows(), 300);
	}, []);

	const { pathname } = useLocation();

	const [openCreate, setOpenCreate] = useState(pathname === '/category/create');

	const Action = async (body) => {
		try {
			const resp = await Api('Categorys', 'CREATE', body);

			Alert.fire({ icon: 'success', title: resp.message });

			setOpenCreate(false);

			await Refresh_Rows();
		} catch (err) {
			console.clear();
			console.error(err);
		}
	};

	const fromDataCreate = [
		{
			type: 'text',
			name: 'name',
			label: 'Nueva categoria',
			rules: (value) => ({ required: true }),
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<CategoryIcon />
					</InputAdornment>
				),
			},
		},
	];

	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			width: 200,
			InputProps: { readOnly: true },
		},
		{
			field: 'name',
			headerName: 'name',
			width: 200,
			sortable: true,
		},
	];

	const [fromDataEdit] = useState([
		{
			type: 'text',
			name: 'name',
			label: 'Nombre actual',
			value: 'aa',
		},
	]);

	const formDataEditNuevo = [
		{
			type: 'text',
			name: 'name',
			label: 'Nuevo nombre de categoria',
			rules: (value) => ({ required: true }),
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<CategoryIcon />
					</InputAdornment>
				),
			},
		},
	];

	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setEditData] = useState({});

	const actions = {
		async edit(api) {
			console.log('edit', api.row.name);

			fromDataEdit[0].value = api.row.name;

			setEditData(api.row);

			setOpenEdit(true);
		},
		async remove(api) {
			const { id, name } = api.row;
			const result = await Alert.fire({
				title: `Desea eliminar la categoria ${api.row.name}`,
				showDenyButton: true,
				showConfirmButton: true,
				confirmButtonText: 'Si',
				denyButtonText: `No`,
			});

			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				await Api('Categorys', 'DELETE', { id });

				Alert.fire(`Categoria ${name} eliminada`, '', 'success');

				await Refresh_Rows();
			}

			console.log('api', api);
		},
	};

	const ActionEdit = async (body) => {
		try {
			console.log('body', body);
			const { name } = body;
			const { id } = editData;

			const result = await Alert.fire({
				title: `Desea editar la categoria ${name}`,
				showDenyButton: true,
				showConfirmButton: true,
				confirmButtonText: `Si`,
				denyButtonText: `No`,
			});

			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				await Api('Categorys', 'EDIT', { id, name }, false);

				await Refresh_Rows();

				Alert.fire(`Categoria ${name} a sido editada`, '', 'success');
			}
			setOpenEdit(false);

			await Refresh_Rows();
		} catch (err) {
			console.clear();
			console.error(err);
		}
	};

	return (
		<Fragment>
			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<h1>Categorias</h1>

				<CreateTable rows={rows} columns={columns} actions={actions} />
			</Box>
			<Modal open={openCreate} onClose={() => setOpenCreate(false)}>
				<CreateForm
					title='Crear Categoria'
					buttonText='crear'
					Action={Action}
					schema={schema}
					fromInput={fromDataCreate}
				/>
			</Modal>
			<Modal open={openEdit} onClose={() => setOpenEdit(false)}>
				<div className='ed-grid m-grid-2'>
					<div className='m-cols-2 s-center'>
						<h1>Editar Categoria</h1>
					</div>
					<CreateForm offButton={true} fromInput={fromDataEdit} />
					<CreateForm buttonText='Editar' Action={ActionEdit} schema={schema} fromInput={formDataEditNuevo} />
				</div>
			</Modal>
			<Box sx={{ '& > :not(style)': { m: 1 } }}>
				<Fab onClick={() => setOpenCreate(true)} size='medium' color='primary' className={'fab'} aria-label='add'>
					<AddIcon />
				</Fab>
			</Box>{' '}
		</Fragment>
	);
};

export default Categorys;
