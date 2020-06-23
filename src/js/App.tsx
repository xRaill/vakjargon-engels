import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from './pages/Loading';
import Header from './components/Header';

import styles from '../scss/pages/App.scss';

const Routes: {path: string, name: string, exact?: boolean}[] = [
	{path: '/', name: 'Main', exact: true},
	{path: '/game', name: 'Game'},
	{path: '/complete', name: 'Complete'},
	{path: '/test', name: 'Test'},
	{path: '', name: 'NotFound'}
];

const App = () => {

	const LoadPage = (name: string) => Loadable({
		loader: () => import(`./pages/${name}`),
		loading: (props) => <Loading {...props} />,
		timeout: 5000
	});

	return(
		<Router basename={window.location.host.includes('github.io') ? 'vakjargon-engels/' : ''}>
			<div className={styles.container}>
				<div className={styles.row}><Header/></div>
				<Switch>
					{Routes.map((route, i) => <Route
						key={i}
						path={route.path}
						component={LoadPage(route.name)}
						exact={!!route.exact}
					/>)}
				</Switch>
			</div>
		</Router>
	);
};

export default App;