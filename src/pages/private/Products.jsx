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
		price: yup.number().required(),
		id_category: yup.number().required(),
		id_vendor: yup.number().required(),
		description: yup.string(),
	})
	.required();

const schemaEdit = yup
	.object({
		name: yup.string(),
		price: yup.number().required(),
		stock: yup.number().required(),
		id_category: yup.number().required(),
		id_vendor: yup.number().required(),
		description: yup.string(),
	})
	.required();

const Products = () => {
	// const History = useHistory();

	const [rows, setRows] = useState([]);

	const { pathname } = useLocation();

	const [openCreate, setOpenCreate] = useState(pathname === '/category/create');

	const [currencies, setCurrencies] = useState([]);
	const [currenciesVendors, setCurrenciesVendors] = useState([]);

	const Refresh_Rows = async (offAlert) => {
		const resp = await Api('Products', 'ALL');
		console.log('resp.info', resp.info);
		setRows(resp.info);
	};

	const getCategorys = async (offAlert) => {
		const resp = await Api('Categorys', 'ALL');
		const data = resp.info.map(({ id, name }) => ({ label: name, value: id }));

		const respVendors = await Api('Vendors', 'ALL');
		const dataVendors = respVendors.info.map(({ id, name }) => ({ label: name, value: id }));

		setCurrenciesVendors(dataVendors);
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
			const resp = await Api('Products', 'CREATE', body);

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
			name: 'price',
			label: 'Precio',
			rules: (value) => ({ required: true }),
			InputProps: {
				startAdornment: <InputAdornment position='start'>$</InputAdornment>,
				inputProps: { min: 0 },
			},
		},
		{
			type: 'number',
			name: 'stock',
			label: 'Existencia',
			rules: (value) => ({ required: true }),
			InputProps: {
				startAdornment: <InputAdornment position='start'>N</InputAdornment>,
				inputProps: { min: 0 },
			},
		},
		{
			type: 'select',
			name: 'id_category',
			label: 'Categoria',
			rules: (value) => ({ required: true }),
			currencies,
		},
		{
			type: 'select',
			name: 'id_vendor',
			label: 'Proveedor',
			rules: (value) => ({ required: true }),
			currencies: currenciesVendors,
		},
		{
			type: 'multi-line',
			name: 'description',
			label: 'Descriccion',
			rules: (value) => ({ required: true }),
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
			field: 'description',
			headerName: 'descriccion',
			width: 150,
			sortable: true,
		},
		{
			field: 'category',
			headerName: 'Categoria',
			width: 150,
			sortable: true,
		},
		{
			field: 'stock',
			headerName: 'Existencia',
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
			name: 'price',
			label: 'Precio',
			rules: (value) => ({ required: true }),
			InputProps: {
				startAdornment: <InputAdornment position='start'>$</InputAdornment>,
				inputProps: { min: 0 },
			},
		},
		{
			type: 'number',
			name: 'stock',
			label: 'Existencia',
			rules: (value) => ({ required: true }),
			InputProps: {
				startAdornment: <InputAdornment position='start'>N</InputAdornment>,
				inputProps: { min: 0 },
			},
		},
		{
			type: 'text',
			name: 'category',
			label: 'Categoria',
			rules: (value) => ({ required: true }),
		},
		{
			type: 'text',
			name: 'vendor',
			label: 'Proveedor',
			rules: (value) => ({ required: true }),
		},
		{
			type: 'multi-line',
			name: 'description',
			label: 'Descriccion',
			rules: (value) => ({ required: true }),
		},
	]);

	const formDataEditNuevo = [
		{
			type: 'text',
			name: 'name',
			label: 'Nombre',
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
			name: 'price',
			label: 'Precio',
			InputProps: {
				startAdornment: <InputAdornment position='start'>$</InputAdornment>,
				inputProps: { min: 0, max: 10 },
			},
		},
		{
			type: 'select',
			name: 'id_category',
			label: 'Categoria',
			currencies,
		},
		{
			type: 'multi-line',
			name: 'description',
			label: 'Descriccion',
		},
	];

	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setEditData] = useState({});

	const actions = {
		async edit(api) {
			// console.log('edit', api.row.id_category);

			// const { name, price, id_category, description } = api.row;

			console.log('api.row', api.row);

			Object.keys(api.row).forEach((key) => {
				console.log('key', key);

				const i = fromDataEdit.findIndex(({ name }) => name === key);
				console.log('i', i);

				if (i !== -1) fromDataEdit[i].value = api.row[key];
			});

			// setEditData(api.row);

			setOpenEdit(true);
		},
		async remove(api) {
			const { id, name } = api.row;
			const result = await Alert.fire({
				title: `Desea eliminar el producto ${api.row.name}`,
				showDenyButton: true,
				showConfirmButton: true,
				confirmButtonText: 'Si',
				denyButtonText: `No`,
			});

			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				await Api('Products', 'DELETE', { id });

				Alert.fire(`producto ${name} a sido eliminado`, '', 'success');

				await Refresh_Rows();
			}
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
				await Api('Products', 'EDIT', { id, name });

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
				<h1>Productos</h1>

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

export default Products;
