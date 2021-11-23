import { useState, useEffect, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../../components/Modal';
import { useLocation } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
import * as yup from 'yup';
import CreateForm from '../../components/createForm';
import CreateTable from '../../components/createTable';
import Alert from '../../hook/Alert';
import StoreIcon from '@mui/icons-material/Store';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

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
		name: yup.string(),
		rif: yup.number(),
		email: yup.string().email(),
		phone: yup.string(),
		direction: yup.string(),
	})
	.required();

const schemaEdit = yup
	.object({
		name: yup.string(),
		rif: yup.string(),
		email: yup.string().email(),
		phone: yup.number(),
		direction: yup.string(),
	})
	.required();

const Vendors = () => {
	// const History = useHistory();

	const [rows, setRows] = useState([]);

	const { pathname } = useLocation();

	const [openCreate, setOpenCreate] = useState(pathname === '/category/create');

	const [currencies, setCurrencies] = useState([]);

	const Refresh_Rows = async (offAlert) => {
		const resp = await Api('Vendors', 'ALL');
		setRows(resp.info);
	};

	const getCategorys = async (offAlert) => {
		const resp = await Api('Categorys', 'ALL');
		const data = resp.info.map(({ id, name }) => ({ label: name, value: id }));
		setCurrencies(data);
	};

	useEffect(() => {
		setTimeout(() => {
			getCategorys();
			Refresh_Rows();
		}, 300);
	}, []);

	const Action = async (body) => {
		try {
			const resp = await Api('Vendors', 'CREATE', body);

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
			label: 'Nombre',
			rules: (value) => ({ required: true }),
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<StoreIcon />
					</InputAdornment>
				),
			},
		},
		{
			type: 'number',
			name: 'rif',
			label: 'Rif',
			InputProps: {
				startAdornment: <InputAdornment position='start'>J-</InputAdornment>,
				inputProps: { min: 0 },
			},
		},
		{
			type: 'email',
			name: 'email',
			label: 'Correo',
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<EmailIcon />
					</InputAdornment>
				),
				inputProps: { min: 0 },
			},
		},
		{
			type: 'number',
			name: 'phone',
			label: 'Telefono',
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<PhoneIcon />
					</InputAdornment>
				),
				inputProps: { min: 0 },
			},
		},
		{
			type: 'multi-line',
			name: 'direction',
			label: 'Direccion',
		},
	];

	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			width: 150,
			InputProps: { readOnly: true },
		},
		{
			field: 'name',
			headerName: 'nombre',
			width: 150,
			sortable: true,
		},
		{
			field: 'rif',
			headerName: 'Rif',
			width: 150,
			sortable: true,
		},
		{
			field: 'email',
			headerName: 'Correo',
			width: 150,
			sortable: true,
		},
		{
			field: 'phone',
			headerName: 'Telefono',
			width: 150,
			sortable: true,
		},
		{
			field: 'direction',
			headerName: 'Direccion',
			width: 150,
			sortable: true,
		},
	];

	const [fromDataEdit] = useState([
		{
			type: 'text',
			name: 'name',
			label: 'Nombre',
			rules: (value) => ({ required: true }),
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<StoreIcon />
					</InputAdornment>
				),
			},
		},
		{
			type: 'number',
			name: 'rif',
			label: 'Rif',
			InputProps: {
				startAdornment: <InputAdornment position='start'>J-</InputAdornment>,
				inputProps: { min: 0 },
			},
		},
		{
			type: 'text',
			name: 'email',
			label: 'Correo',
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<EmailIcon />
					</InputAdornment>
				),
				inputProps: { min: 0 },
			},
		},
		{
			type: 'number',
			name: 'phone',
			label: 'Telefono',
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<PhoneIcon />
					</InputAdornment>
				),
				inputProps: { min: 0 },
			},
		},
		{
			type: 'multi-line',
			name: 'direction',
			label: 'Direccion',
		},
	]);

	const formDataEditNuevo = [
		{
			type: 'text',
			name: 'name',
			label: 'Nombre',
			rules: (value) => ({ required: true }),
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<StoreIcon />
					</InputAdornment>
				),
			},
		},
		{
			type: 'number',
			name: 'rif',
			label: 'Rif',
			InputProps: {
				startAdornment: <InputAdornment position='start'>J-</InputAdornment>,
				inputProps: { min: 0 },
			},
		},
		{
			type: 'email',
			name: 'email',
			label: 'Correo',
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<EmailIcon />
					</InputAdornment>
				),
				inputProps: { min: 0 },
			},
		},
		{
			type: 'number',
			name: 'phone',
			label: 'Telefono',
			InputProps: {
				startAdornment: (
					<InputAdornment position='start'>
						<PhoneIcon />
					</InputAdornment>
				),
				inputProps: { min: 0 },
			},
		},
		{
			type: 'multi-line',
			name: 'direction',
			label: 'Direccion',
		},
	];

	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setEditData] = useState({});

	const actions = {
		async edit(api) {
			console.log('edit', api.row.dataValues);

			Object.keys(api.row.dataValues).forEach((key) => {
				console.log('key', key);

				const i = fromDataEdit.findIndex(({ name }) => name === key);
				console.log('i', i);

				if (i !== -1) fromDataEdit[i].value = api.row[key];
			});

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
				await Api('Vendors', 'DELETE', { id });

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
				title: `Desea editar la El proveedor ${id}`,
				showDenyButton: true,
				showConfirmButton: true,
				confirmButtonText: `Si`,
				denyButtonText: `No`,
			});

			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				console.log('{ id, ...body }', { id, ...body });
				await Api('Vendors', 'EDIT', { id, ...body });

				await Refresh_Rows();

				Alert.fire(`Categoria ${name} a sido editada`, '', 'success');

				setOpenEdit(false);
			}
		} catch (err) {
			console.clear();
			console.error(err);
		}
	};

	return (
		<Fragment>
			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<h1>Proveedores</h1>

				<CreateTable rows={rows} columns={columns} actions={actions} />
			</Box>
			<Modal open={openCreate} onClose={() => setOpenCreate(false)}>
				<CreateForm
					title='Crear Producto'
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
					<CreateForm buttonText='Editar' Action={ActionEdit} schema={schemaEdit} fromInput={formDataEditNuevo} />
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

export default Vendors;
