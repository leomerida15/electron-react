import { BrowserRouter, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import routes from './routes/index';

import { Auth } from './guards';

const Routes = () => (
	<BrowserRouter>
		<GuardProvider guards={[Auth]}>
			<Switch>
				{routes.map(({ path, component, meta }) => {
					return <GuardedRoute path={path} exact component={component} meta={meta} />;
				})}
				{/*  */}
				<GuardedRoute path='*' meta={{ auth: true }} />
			</Switch>
		</GuardProvider>
	</BrowserRouter>
);

export default Routes;
