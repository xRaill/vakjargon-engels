import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import Transition from '../Transition';

import styles from '../../../scss/pages/Game.scss';

const Score = (props, ref) => {    
	
	const [visible, setVisible] = useState<boolean>(false);
	const [score, setScore] = useState<number>(0);

	useImperativeHandle(ref, () => ({
		getScore: () => score,
		increseScore: () => {
			setVisible(false);
			setTimeout(() => setScore(score + 1), 500);
		},
		decreseScore: () => {
			setVisible(false);			
			setTimeout(() => setScore(score - 1), 500);
		}
	}));

	useEffect(() => {
		setVisible(true);
	}, [score]);

	return (
		<Transition in={visible} timeout={500} className={"animateScore"} style={styles}>
			<h1 className={styles["text-center"]}>{score}</h1>
		</Transition>
	);
};

export default forwardRef(Score);