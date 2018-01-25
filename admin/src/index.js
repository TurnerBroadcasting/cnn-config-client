import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-validator/dist/validator.min.js';
import './styles/styles.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Router, browserHistory} from 'react-router';
import routes from './routes';

ReactDOM.render(
        <Router history={browserHistory} routes={routes}>
            <App />
        </Router>
        
    , document.getElementById('root'));
registerServiceWorker();
