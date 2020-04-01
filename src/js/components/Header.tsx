import React from 'react';

import styles from '../../scss/components/Header.scss';

const Header = () => (
	<div className={`${styles["bg-primary"]} ${styles.alert} ${styles.header}`}>
		<div className={styles["text-center"]}>
			<h1>Vakjargon Engels</h1>
		</div>
	</div>
)

export default Header;