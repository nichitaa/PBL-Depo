import React from "react";
import { Route, Switch } from "react-router-dom";
import {
	PageNotFound,
	NewProjectPage,
	Catalogue,
	EditProjectPage,
	ForgotPassword,
	Home,
	LogIn,
	ProjectPage,
	SignUp,
	User,
	Guide,
} from "../pages";
import { PrivateRoute, ScrollToTop } from "../helpers";
import * as ROUTES from "./routes";
import VerifyEmail from "../pages/AuthPages/VerifyEmail";

const routes = [
	{
		path: ROUTES.EDIT_PROJECT,
		component: EditProjectPage,
	},
	{
		path: ROUTES.PROJECT_FORM,
		component: NewProjectPage,
	},
	{
		path: ROUTES.PROJECT_ID,
		component: ProjectPage,
	},
	{
		path: ROUTES.CATALOGUE,
		component: Catalogue,
	},
	{
		path: ROUTES.SIGN_UP,
		component: SignUp,
	},
	{
		path: ROUTES.LOG_IN,
		component: LogIn,
	},
	{
		path: ROUTES.VERIFY_EMAIL,
		component: VerifyEmail,
	},
	{
		path: ROUTES.FORGOT_PASSWORD,
		component: ForgotPassword,
	},
	{
		path: ROUTES.USER,
		component: User,
	},
	{
		path: ROUTES.HOME,
		component: Home,
	},
	{
		path: ROUTES.PAGE_NOT_FOUND,
		component: PageNotFound,
	},
	{
		path: ROUTES.GUIDE,
		component: Guide,
	},
];

export const routeComponents = routes.map(({ path, component }, key) => {
	if (path === ROUTES.USER) {
		return (
			<PrivateRoute exact path={path} component={component} key={key} />
		);
	}
	return <Route exact path={path} component={component} key={key} />;
});

const Routing = () => (
	<>
		<ScrollToTop />
		<Switch>
			{routeComponents}
			<Route render={() => <PageNotFound />} />
		</Switch>
	</>
);

export default Routing;
