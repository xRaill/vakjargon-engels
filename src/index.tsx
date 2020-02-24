import React from 'react';
import { render } from 'react-dom';

import Loadable from 'react-loadable';
import Loading from './js/pages/Loading';

const LoadPage = Loadable({
	loader: () => import('./js/App'),
	loading: (props) => <Loading {...props} />,
	timeout: 5000
});

render(<LoadPage />, document.getElementById('root'));