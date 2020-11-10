import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {PrivateRoute, ScrollToTop } from "./helpers";
// routes
import * as ROUTES from './constants/routes';
// pages
import {Home, Catalogue, User, SignUp, LogIn, ForgotPassword, AboutUs, ProjectPage} from "./pages";
// my custom components
import { Footer, NavBarContainer } from "./components";

export default function App() {
    return (
        <Router>
            <NavBarContainer/>
            <ScrollToTop/>
            <div className="container-fluid">
                <Switch>
                    <Route exact path={ROUTES.HOME} component={Home}/>

                    <Route exact path={ROUTES.CATALOGUE} component={Catalogue}/>

                    <PrivateRoute exact path={ROUTES.USER} component={User}/>

                    <Route path={ROUTES.PROJECT_ID} component={ProjectPage}/>

                    <Route exact path={ROUTES.ABOUT_US} component={AboutUs}/>

                    <Route exact path={ROUTES.SIGN_UP} component={SignUp}/>

                    <Route exact path={ROUTES.LOG_IN} component={LogIn}/>

                    <Route exact path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword}/>
                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}