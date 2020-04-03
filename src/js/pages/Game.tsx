import React, { useState, useEffect } from 'react';
import Transition from '../components/Transition';
import { Redirect } from 'react-router-dom';

import styles from '../../scss/pages/Game.scss';

interface Quiz  {
	id: number
	question: string
	options: string[]
	correct: number
}

const Questions: Quiz[] = require('../quiz.json');

let Quiz: Quiz[] = Questions.slice();

const Game = () => {

	const [currentQuestion, setCurrentQuestion] = useState<Quiz>();
	const [chosenAnswer,setChosenAnswer] = useState<number>();
	const [answers, setAnswers] = useState<{i: number; v: string, b: string}[]>();
	const [score, setScore] = useState<number>(0);
	const [visible, setVisible] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(true);
	const [questionI, setQuestionI] = useState<number>(0);

	useEffect(() => {

		const randomQuestion = () => {
			const randomNum: number = Math.floor(Math.random() * Quiz.length);
			
			setCurrentQuestion(Quiz[randomNum]);
			
			const unsortedAnswers = Quiz[randomNum].options.map((a,i) => ({i:i,a:a}));
			let sortedAnswers = [];
			for (let i = 0; i < 4; i++) {
				let num = [[0,1,2,3],[3,2,0,1],[1,0,3,2],[2,3,1,0]][questionI][i];

				sortedAnswers.push({
					i: unsortedAnswers[num].i,
					v: unsortedAnswers[num].a,
					b: 'primary'
				});
			}
			setQuestionI(questionI == 3 ? 0 : questionI + 1);
			
			setAnswers(sortedAnswers);
			setVisible(true);
			setDisabled(false);
		}
		
		if(!currentQuestion) randomQuestion();
		
		if(typeof(chosenAnswer) === 'number') {
			const answer = answers.find(a => a.i == chosenAnswer);

			setDisabled(true);

			if(chosenAnswer === currentQuestion.correct) {
				answer.b = 'success';
				setTimeout(() => setScore(score + 1), 1200);
			} else {
				answer.b = 'danger';
				setTimeout(() => setScore(score - 1), 1200);
			}
			
			setTimeout(() => {
				setVisible(false);
				Quiz.splice(Quiz.findIndex(a => a.id === currentQuestion.id), 1);
				if(Quiz.length) setTimeout(() => randomQuestion(), 500);
			}, 1000);
		}
	}, [chosenAnswer]);
	
	if(!Quiz.length) {
		Quiz = Questions.slice();
		return <Redirect push to={{
			pathname: 'complete',
			state: {score: score}
		}}/>
	}
	
	return(
		<>
		<div className={`${styles.row} ${styles["py-lg-5"]}`}>
			<div className={styles["col-2"]}>
				<Transition in={visible} timeout={500} className={"animateScore"} style={styles}>
					<h1 className={styles["text-center"]}>{score}</h1>
				</Transition>
			</div>
			<Transition in={visible} timeout={400} className={"animateQuestion"} style={styles}>
				<h1 className={`${styles["col-8"]} ${styles["text-center"]}`}>
					{currentQuestion ? currentQuestion.question : ''}
				</h1>
			</Transition>
		</div>
		<Transition in={visible} timeout={500} className={"animateButtons"} style={styles}>
			<div className={`${styles.row}`}>
				{currentQuestion ? answers.map(a =>
					<div key={a.i} className={`
						${styles["col-lg-6"]} ${styles.center}
						${styles["py-4"]} ${styles["py-lg-5"]}
						${disabled ? styles.disableClick :''}
					`}>
						<button onClick={()=> setChosenAnswer(a.i)} className={`
							${styles.btn} ${styles["btn-"+ a.b]} ${styles["w-75"]} ${styles["py-3"]}
						`}>
							{a.v}
						</button>
					</div>
				):''}
			</div>
		</Transition>
		</>
	);
};

export default Game;