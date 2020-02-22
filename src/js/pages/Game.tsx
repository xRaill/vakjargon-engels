import React, { useState, useEffect } from 'react';

import styles from '../../scss/pages/Game.scss';

interface Quiz {
	id:       number;
	question: string;
	options:  string[];
	correct:  number;
}

const Quiz: Quiz[] = [
	{id: 0, question: 'Hoeveel is 2 + 2 ?', options: ['1', '4', '6', '8'], correct: 1},
	// {id: 0, question: 'aBCD', options: ['A', 'B', 'C', 'D'], correct: 0},
	// {id: 1, question: 'AbCD', options: ['A', 'B', 'C', 'D'], correct: 1},
	// {id: 2, question: 'ABcD', options: ['A', 'B', 'C', 'D'], correct: 2},
	// {id: 3, question: 'ABCd', options: ['A', 'B', 'C', 'D'], correct: 3},
	// {id: 4, question: 'Abcd', options: ['A', 'B', 'C', 'D'], correct: 0},
	// {id: 5, question: 'aBcd', options: ['A', 'B', 'C', 'D'], correct: 1},
	// {id: 6, question: 'abCd', options: ['A', 'B', 'C', 'D'], correct: 2},
	// {id: 7, question: 'abcD', options: ['A', 'B', 'C', 'D'], correct: 3}
];

const Game = () => {

	const [currentQuestion, setCurrentQuestion] = useState<Quiz>();
	const [chosenAnswer, setChosenAnswer] = useState<number>();
	const [answers, setAnswers] = useState<{i: number; v: string}[]>();

	useEffect(() => {

		const randomQuestion = () => {
			const randomNum: number = Math.floor(Math.random() * Quiz.length);

			setCurrentQuestion(Quiz[randomNum]);

			const answers = Quiz[randomNum].options.map((a,i) => ({i:i,a:a}));
			let answersNew = [];
			for (let i = 0; i < 4; i++) {
				const num = Math.floor(Math.random() * answers.length);

				answersNew.push({
					i: answers[num].i,
					v: answers[num].a
				});

				answers.splice(num, 1);
			}

			setAnswers(answersNew);
		};

		if(!currentQuestion) randomQuestion();

		if(chosenAnswer != undefined) {
			if(chosenAnswer === currentQuestion.correct) {
				alert('correct')
			} else 
			{
				alert('false');
			}

			setChosenAnswer(undefined);
		};

	}, [chosenAnswer]);

	return(
		<>
		<div className={`${styles.row} ${styles["justify-content-center"]} ${styles["py-lg-5"]}`}>
			<h1>{currentQuestion ? currentQuestion.question : ''}</h1>
		</div>
		<div className={styles.row}>
			{currentQuestion ?
				answers.map(a =>
				<div className={`${styles["col-lg-6"]} ${styles.center} ${styles["py-4"]} ${styles["py-lg-5"]}`}
					key={a.i}>

					<button className={`${styles.btn} ${styles["btn-primary"]} ${styles["w-75"]} ${styles["py-3"]}`}
						onClick={()=> setChosenAnswer(a.i)}>
						{a.v}
					</button>

				</div>)
			:''}
		</div>
		</>
	);
};

export default Game;