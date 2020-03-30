import React from 'react';

import styles from '../../scss/pages/Loading.scss';

const Loading = (props) => (
	<div className={styles.center}>
		<div className={styles["spinner-border"]} role="status" />
	</div>
)

export default Loading;