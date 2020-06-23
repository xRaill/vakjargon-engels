import React, { useState, useRef, useCallback, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import Score from '../components/Quiz/Score';
import Title from '../components/Quiz/Title';
import Button from '../components/Quiz/Button';

import styles from '../../scss/pages/Game.scss';

interface Quiz  {
	id: number
	question: string
	options: string[]
	correct: number
}

const Data = require('../quiz.json');

const quizManager = (quiz: {current: any, data: Quiz[]}, newQuestion) => {
	const randomNum = ~~(Math.random() * quiz.data.length);
	return {
		current: quiz.data[randomNum],
		data: quiz.data.filter((v,i) => i !== randomNum)
	};
}

const Game = () => {

	const [Quiz, newQuestion] = useReducer(quizManager, quizManager({current: {}, data: Data.concat()}, true));
	const [buttons, setButtons] = useState<boolean>(true);
	const [disabled, setDisabled] = useState<boolean>(false)
	const [redirect, setRedirect] = useState<boolean>(false);
	const scoreRef = useRef(null);
	
	const handleAnswer = useCallback(answer => {
		setDisabled(true);
		setTimeout(() => {
			setButtons(false);

			if(Quiz.data.length) {
				setTimeout(() => {
					newQuestion(null);
					setTimeout(() => {
						setButtons(true);
						setDisabled(false);
					}, 500);
				}, 300);
			}
				
			else setRedirect(true);
		}, 700);

		if(Quiz.current.options[Quiz.current.correct] === answer) {
			scoreRef.current.increaseScore();
			return 'success';
		} else {
			scoreRef.current.decreaseScore();
			return 'danger';
		}
	}, [Quiz]);

	if(redirect) return <Redirect push to={{
		pathname: 'complete',
		state: {score: scoreRef.current.getScore()}
	}}/>
	
	return(
		<div className={styles.container}>
			<div className={`${styles.row} ${styles["py-lg-5"]}`}>
				<div className={styles["col-2"]}>
					<Score ref={scoreRef} />
				</div>
				<div className={styles["col-8"]}>
					<Title>{Quiz.current.question}</Title>
				</div>
			</div>
			<div className={styles.row}>
				{Quiz.current.options.map((v: string, i: number) =>
					<Button key={i} hidden={!buttons} disabled={disabled} callback={handleAnswer}>{v}</Button>
				)}
			</div>
		</div>
	);
};

export default Game;