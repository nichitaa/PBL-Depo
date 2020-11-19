import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {PrivateRoute, ScrollToTop} from "./helpers";
// routes
import * as ROUTES from './constants/routes';
// pages
import {Home, Catalogue, User, SignUp, LogIn, ForgotPassword, AboutUs, ProjectPage, EditProject} from "./pages";
// my custom components
import {NavBarContainer, Footer, Particles} from "./components";


export default function App() {
    return (
        <>
            <Router>
                <Particles/>
                <NavBarContainer/>
                <ScrollToTop/>
                <div className="container-fluid">
                    <Switch>
                        <Route path={ROUTES.EDIT_PROJECT} component={EditProject}/>
                        <Route path={ROUTES.PROJECT_ID} component={ProjectPage}/>
                        <Route path={ROUTES.CATALOGUE} component={Catalogue}/>
                        <Route path={ROUTES.ABOUT_US} component={AboutUs}/>
                        <Route path={ROUTES.SIGN_UP} component={SignUp}/>
                        <Route path={ROUTES.LOG_IN} component={LogIn}/>
                        <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword}/>
                        <PrivateRoute path={ROUTES.USER} component={User}/>
                        <Route path={ROUTES.HOME} component={Home}/>
                        <Route render={() => {
                            return <> PAGE NOT FOUND 404 :( </>
                        }}/>
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        </>
    );
}