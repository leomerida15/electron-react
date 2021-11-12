import { useState } from 'react';
import Card from './components/card';
import { styled, ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import Home from './pages/Home';

// const fs = window.require('fs');
// const pathModule = window.require('path');

const { app, ...remote } = window.require('@electron/remote');

const MyThemeComponent = styled('div')(({ theme }) => ({
	padding: theme.spacing(1),
}));

const theme = createTheme();

function App() {
	const [path, setPath] = useState(app.getAppPath());
	// const [hola, setHola] = useState(remote.require('./functions').hola());

	return (
		<div>
			<ThemeProvider theme={theme}>
				<MyThemeComponent>
					<h1>{path}</h1>
					<Home />
				</MyThemeComponent>
			</ThemeProvider>
		</div>
	);
}

export default App;
