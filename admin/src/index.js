/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-validator/dist/validator.min.js';
import './styles/styles.css';
//import registerServiceWorker from './registerServiceWorker';

render(
    <Router history={browserHistory} routes={routes} />,
     document.getElementById('root')
);
        
//registerServiceWorker();
