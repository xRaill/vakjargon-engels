import React from 'react';

import styles from '../../scss/components/Header.scss';

const Header = () => (
	<div className={`${styles["bg-primary"]} ${styles.alert} ${styles.header}`}>
		<h1>Hello world!</h1>
	</div>
)

export default Header;