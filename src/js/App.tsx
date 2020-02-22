import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from './pages/Loading';
import Header from './components/Header';

import styles from '../scss/pages/App.scss';

interface route {
	path:   string
	name:   string
	menu?:  boolean
	exact?: boolean
} 

const App = () => {

	const Routes: route[] = [
		{path: '/', name: 'Main', menu: true, exact: true},
		{path: '/game', name: 'Game'},
		{path: '/test', name: 'Test'},
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
				<Switch>
					{Routes.map((route: route, i: number) => <Route
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