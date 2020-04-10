import React, { useState, useEffect } from 'react';
import Transition from '../Transition';

import styles from '../../../scss/pages/Game.scss';

const Title = ({ children }) => {

	const [visible, setVisible] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');

	useEffect(() => {
		setVisible(false);
        setTimeout(() => {
            setVisible(true);
            setTitle(children);
        }, 400);
	}, [children]);

	return (
		<Transition in={visible} timeout={400} className={"animateQuestion"} style={styles}>
			<h1 className={styles["text-center"]}>
                {title}
			</h1>
		</Transition>
	);
};

export default Title;