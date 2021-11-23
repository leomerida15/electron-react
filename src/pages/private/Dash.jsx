import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Switch, Link, useLocation } from 'react-router-dom';
import { GuardedRoute } from 'react-router-guards';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StoreIcon from '@mui/icons-material/Store';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

//
import Categorys from './Categorys';
import Products from './Products';
import Vendors from './Vendors';

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const Dash = () => {
	// const History = useHistory();

	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position='fixed' open={open}>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							sx={{
								marginRight: '36px',
								...(open && { display: 'none' }),
							}}>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' noWrap component='div'>
							{useLocation().pathname}
						</Typography>
					</Toolbar>
				</AppBar>

				<Drawer variant='permanent' open={open}>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</DrawerHeader>
					<Divider />

					<List>
						{[
							{ text: 'Casa', icon: <HomeIcon />, path: '/dash' },
							{ text: 'Usuarios', icon: <LocalShippingIcon />, path: '/dash/users' },
							{ text: 'Clientes', icon: <LocalShippingIcon />, path: '/dash/clients' },
							{ text: 'Categorias', icon: <CategoryIcon />, path: '/dash/category' },
							{ text: 'Productos', icon: <StoreIcon />, path: '/dash/products' },
							{ text: 'Proveedores', icon: <LocalShippingIcon />, path: '/dash/vendors' },
						].map(({ text, path, icon }, i) => (
							<Link to={path} key={i}>
								<ListItem button key={text}>
									<ListItemIcon>{icon}</ListItemIcon>
									<ListItemText primary={text} />
								</ListItem>
							</Link>
						))}
					</List>
				</Drawer>

				<Switch>
					<GuardedRoute path={'/dash/category'} exact component={Categorys} meta={{ auth: true }} />
					<GuardedRoute path={'/dash/products'} exact component={Products} meta={{ auth: true }} />
					<GuardedRoute path={'/dash/vendors'} exact component={Vendors} meta={{ auth: true }} />
					{/*  */}
					{/* <GuardedRoute path='*' meta={{ auth: true }} /> */}
				</Switch>
			</Box>{' '}
		</>
	);
};

export default Dash;
