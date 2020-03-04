import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../scss/pages/Complete.scss';

const Complete = (props) => {
	
	console.log(props)
	return(
		<div>
			<h1>{props.location.state ? props.location.state.score : '...'}</h1>
			<h3>Complete!</h3>
			<Link to={"Game"}><button className={`${styles.btn} ${styles['bg-primary']}`}>Retry</button></Link>
			<br/><br/>
			<button className={`${styles.btn} ${styles['bg-primary']}`}>...</button>
		</div>
	)
};

export default Complete;