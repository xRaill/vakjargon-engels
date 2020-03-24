import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Transition from '../components/Transition';

import styles from '../../scss/pages/Main.scss';

const Main = () => {
	const [visible, setVisible] = useState(false);
	const [redirect, setRedirect] = useState(null);

	useEffect(() => {
		setVisible(true);
	}, []);

	const goTo = (path) => {
		setVisible(false);
		setTimeout(() => (
			setRedirect(path)
		), 200);
	}

	if(redirect) return <Redirect push to={redirect} />

	return(
		<Transition in={visible} timeout={500} className={"animatePage"} style={styles}>
			<div className={styles.center}>
				<h1 className={styles["py-5"]}>MAIN</h1>
				<div className={styles["py-5"]}>
					<button className={`${styles.btn} ${styles["bg-primary"]}`} onClick={() => goTo('test')}>Test</button>
					<button className={`${styles.btn} ${styles["bg-primary"]}`} onClick={() => goTo('game')}>Start</button>
				</div>
			</div>
		</Transition>
	)
};

export default Main;