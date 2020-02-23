import React, { useState, useEffect } from 'react';
import Transition from '../components/Transition';

import styles from '../../scss/pages/Game.scss';

interface Quiz {
	id:       number;
	question: string;
	options:  string[];
	correct:  number;
}

const Quiz: Quiz[] = [
	{id: 0, question: 'aBCD', options: ['A', 'B', 'C', 'D'], correct: 0},
	{id: 1, question: 'AbCD', options: ['A', 'B', 'C', 'D'], correct: 1},
	{id: 2, question: 'ABcD', options: ['A', 'B', 'C', 'D'], correct: 2},
	{id: 3, question: 'ABCd', options: ['A', 'B', 'C', 'D'], correct: 3},
	{id: 4, question: 'Abcd', options: ['A', 'B', 'C', 'D'], correct: 0},
	{id: 5, question: 'aBcd', options: ['A', 'B', 'C', 'D'], correct: 1},
	{id: 6, question: 'abCd', options: ['A', 'B', 'C', 'D'], correct: 2},
	{id: 7, question: 'abcD', options: ['A', 'B', 'C', 'D'], correct: 3}
];

const Game = () => {

	const [currentQuestion, setCurrentQuestion] = useState<Quiz>();
	const [chosenAnswer, setChosenAnswer] = useState<number|true>(true);
	const [answers, setAnswers] = useState<{i: number; v: string, b: string}[]>();

	useEffect(() => {

		const randomQuestion = () => {
			const randomNum: number = Math.floor(Math.random() * Quiz.length);

			setCurrentQuestion(Quiz[randomNum]);

			const prevAnswers = Quiz[randomNum].options.map((a,i) => ({i:i,a:a}));
			let newAnswers = [];
			for (let i = 0; i < 4; i++) {
				const num = Math.floor(Math.random() * prevAnswers.length);
				
				newAnswers.push({
					i: prevAnswers[num].i,
					v: prevAnswers[num].a,
					b: 'primary'
				});
				prevAnswers.splice(num, 1);
			}
			setChosenAnswer(null);
			setAnswers(newAnswers);
		}

		if(!currentQuestion) randomQuestion();

		if(typeof(chosenAnswer) === 'number') {
			const answer = answers.find(a => a.i == chosenAnswer);

			if(chosenAnswer === currentQuestion.correct) {
				answer.b = 'success';
			} else {
				answer.b = 'danger';
			}
			// Set to null if you want to answer again
			setChosenAnswer(null);
		}
	}, [chosenAnswer]);
	
	return(
		<>
		<div className={`${styles.row} ${styles["justify-content-center"]} ${styles["py-lg-5"]}`}>
			<Transition in={!chosenAnswer} timeout={500} className={"slideFadeIn"} style={styles}>
				<h1>{currentQuestion ? currentQuestion.question : ''}</h1>
			</Transition>
		</div>
		<Transition in={!chosenAnswer} timeout={500} className={"popIn"} style={styles}>
			<div className={`${styles.row}`}>
				{currentQuestion ?
					answers.map(a =>
					<div
						className={`${styles["col-lg-6"]} ${styles.center} ${styles["py-4"]} ${styles["py-lg-5"]}`}
						key={a.i}>
						<button
							className={`${styles.btn} ${styles["btn-"+ a.b]} ${styles["w-75"]} ${styles["py-3"]}`}
							onClick={()=> setChosenAnswer(a.i)}
							disabled={a.b !== 'primary'}>
							{a.v}
						</button>
					</div>)
				:''}
			</div>
		</Transition>
		</>
	);
};

export default Game;