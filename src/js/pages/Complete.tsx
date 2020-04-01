import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Transition from '../components/Transition';

import styles from '../../scss/pages/Complete.scss';

const Complete = (props) => {
	
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
		
	if(redirect) return <Redirect to={redirect} />
		
	return(
		<Transition in={visible} timeout={200} className={"animatePage"} style={styles}>
			<div className={styles.center}>
				<h1 className={styles["pt-5"]}>Score</h1>
				<h1 className={styles["pb-5"]}>{props.location.state ? props.location.state.score : '...'}</h1>
				<h3>Complete!</h3>
				<button className={`${styles.btn} ${styles['bg-primary']}`} onClick={() => goTo('game')}>Retry</button>
			</div>
		</Transition>
	)
};

export default Complete;