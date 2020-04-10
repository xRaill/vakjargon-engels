import React, { useState, useEffect } from 'react';
import Transition from '../Transition';

import styles from '../../../scss/pages/Game.scss';

const Button = ({ children, hidden, disabled, callback }) => {

	const [visible, setVisible] = useState<boolean>(false);
	const [state, setState] = useState<'success'|'danger'|'primary'>('danger');

	const handleClick = () => {
		setState(callback(children));
	}

	useEffect(() => {
		setVisible(true);
		setState('primary');
	}, [children]);

	return (
		<Transition in={!hidden && visible} timeout={500} className={"animateButtons"} style={styles}>
			<div className={`${styles["col-lg-6"]} ${styles.center} ${styles["py-4"]} ${styles["py-lg-5"]}`}>
				<button onClick={handleClick} className={`${styles.btn} 
					${styles[("btn-" + state)]} ${disabled ? styles.disableClick: ''}
					${styles["w-75"]} ${styles["py-3"]}`}>
					{children}
				</button>
			</div>
		</Transition>
	);
};

export default Button;