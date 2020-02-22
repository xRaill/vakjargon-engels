import React from 'react';
import { CSSTransition } from 'react-transition-group';

interface Props {
	in: boolean;
	timeout: number;
	className: string;
	style: any;
	children: React.ReactNode;
}

const Transition = (props: Props) => (
	<CSSTransition
		in={props.in}
		timeout={props.timeout}
		classNames={{
			enter:       props.style[props.className + "-enter"],
			enterActive: props.style[props.className + "-enter-active"],
			enterDone:   props.style[props.className + "-enter-done"],
			exit:        props.style[props.className + "-exit"],
			exitActive:  props.style[props.className + "-exit-active"],
			exitDone:    props.style[props.className + "-exit-done"]
		}}
		mountOnEnter
	>
		<>{props.children}</>
	</CSSTransition>
);

export default Transition;