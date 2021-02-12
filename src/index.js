import React from "react";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import history from "./constants/history";
import AppContext from "./context";
import App from "./App";
// Importing the Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

const app = (
	<Router history={history}>
		<AppContext>
			<App />
		</AppContext>
	</Router>
);

render(app, document.getElementById("root"));
