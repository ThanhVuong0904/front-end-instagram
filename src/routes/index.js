import Explore from "../pages/Explore/Explore";
import Home from "../pages/Home/Home";
import Inbox from "../pages/Inbox/Inbox";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Saved from "../pages/Saved/Saved";
import SignUp from "../pages/SignUp/SignUp";

import routes from "./config";

const privateRoutes = [
    { path: routes.home, component: Home },
    { path: routes.explore, component: Explore },
    { path: routes.profile, component: Profile },
    { path: routes.saved, component: Saved },
    { path: routes.inbox, component: Inbox },
];
const publicRoutes = [
    { path: routes.login, component: Login },
    { path: routes.signUp, component: SignUp },
];

export { publicRoutes, privateRoutes };
