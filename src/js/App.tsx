import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from './pages/Loading';
import Header from './components/Header';

import styles from '../scss/pages/App.scss';

const App = () => {

	const Routes = [
		{path: '/', name: 'Main', menu: true, exact: true},
		{path: '', name: 'NotFound'}
	];

	const LoadPage = (name: string) => Loadable({
		loader: () => import(`./pages/${name}`),
		loading: (props) => <Loading {...props} />,
		timeout: 5000
	});

	return(
		<Router>
			<div className={styles.container}>
				<div className={styles.row}><Header/></div>
				<div className={styles.row}>
					<Switch>
						{Routes.map((route, i) => <Route
							key={i}
							path={route.path}
							component={LoadPage(route.name)}
							exact={!!route.exact}
						/>)}
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;