import React from 'react';
import {render} from 'react-dom';
import App from './App';
import AppContext from "./context";

// Importing the Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import history from "./constants/history";
import {Router} from "react-router-dom";

const app = (
    <Router history={history}>
        <AppContext>
            <App/>
        </AppContext>
    </Router>
);

render(app, document.getElementById('root'));






