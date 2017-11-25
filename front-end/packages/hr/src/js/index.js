import { render } from 'react-dom';
import routes from './routes';

import '../scss/index.scss';

const element = document.getElementById('content');
render(routes, element);

document.body.classList.remove('loading');
