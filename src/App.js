import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {PrivateRoute, ScrollToTop} from "./helpers";
// routes
import * as ROUTES from './constants/routes';
// pages
import {Home, Catalogue, User, SignUp, LogIn, ForgotPassword, AboutUs, ProjectPage, EditProject} from "./pages";
// my custom components
import {NavBarContainer, Footer, Particles} from "./components";


const routes = [{
    path: ROUTES.EDIT_PROJECT,
    component: EditProject,
}, {
    path: ROUTES.PROJECT_ID,
    component: ProjectPage,
}, {
    path: ROUTES.CATALOGUE,
    component: Catalogue,
}, {
    path: ROUTES.ABOUT_US,
    component: AboutUs,
}, {
    path: ROUTES.SIGN_UP,
    component: SignUp,
}, {
    path: ROUTES.LOG_IN,
    component: LogIn,
}, {
    path: ROUTES.FORGOT_PASSWORD,
    component: ForgotPassword,
}, {
    path: ROUTES.USER,
    component: User,
}, {
    path: ROUTES.HOME,
    component: Home,
}];

const routeComponents = routes.map(({path, component}, key) => {
    if (path === ROUTES.USER) {
        return <PrivateRoute exact path={path} component={component} key={key}/>
    }
    return <Route exact path={path} component={component} key={key}/>
});


export default function App() {
    return (
        <>
            <Particles/>
            <NavBarContainer/>
            <ScrollToTop/>
            <Switch>
                {routeComponents}
                <Route render={() => (<> PAGE NOT FOUND 404 :( </>)}/>
            </Switch>
            <Footer/>
        </>
    );
}