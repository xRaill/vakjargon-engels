import React from 'react';
import Header from './Header';

import styles from '../scss/pages/App.scss';

const App = () => (
	<div className={styles.container}>
		<Header/>
		<div className={`${styles.row} ${styles.center}`}>
			Test
		</div>
	</div>
);

export default App;