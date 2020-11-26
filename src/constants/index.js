import * as ROUTES from "./routes";
import {AboutUs, Catalogue, EditProject, ForgotPassword, Home, LogIn, ProjectPage, SignUp, User} from "../pages";

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

export default routes;