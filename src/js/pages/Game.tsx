import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import Transition from '../components/Transition';
import Score from '../components/Quiz/Score';
import Title from '../components/Quiz/Title';

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
	const [visible, setVisible] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(true);
	const [questionI, setQuestionI] = useState<number>(0);
	const [redirect, setRedirect] = useState<boolean>(false);
	const scoreRef = useRef(null);

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
				scoreRef.current.increaseScore();
			} else {
				answer.b = 'danger';
				scoreRef.current.decreaseScore();
			}
			
			setTimeout(() => {
				setVisible(false);
				Quiz.splice(Quiz.findIndex(a => a.id === currentQuestion.id), 1);
				if(Quiz.length) setTimeout(() => randomQuestion(), 500);
				else setTimeout(() => setRedirect(true), 500);
			}, 1000);
		}
	}, [chosenAnswer]);
	
	if(redirect) {
		Quiz = Questions.slice();
		return <Redirect push to={{
			pathname: 'complete',
			state: {score: scoreRef.current.getScore()}
		}}/>
	}
	
	return(
		<>
		<div className={`${styles.row} ${styles["py-lg-5"]}`}>
			<div className={styles["col-2"]}>
				<Score ref={scoreRef} />
			</div>
			<div className={styles["col-8"]}>
				<Title>{currentQuestion ? currentQuestion.question : ''}</Title>
			</div>
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