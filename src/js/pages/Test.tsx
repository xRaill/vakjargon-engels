import React from 'react';
import { Link } from 'react-router-dom';


const Test = () => {
	
	const list = {score: 1}
	
	return(
		<>
			<h3>Test page</h3>
			<Link to={{
				pathname: "Complete",
				state: { score: 5 }
			}}>...</Link>
		</>
	);
};

export default Test;