import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { privateRoutes, publicRoutes } from "./routes";
import GlobalStyles from "./components/GlobalStyles";
import Default from "./layouts/Default/Default";
import NotFound from "./pages/NotFound/NotFound";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const PrivateRoute = ({ children }) => {
    const { auth } = useSelector((state) => state.auth);
    console.log("auth", auth);
    return auth ? children : <Navigate to="/login" />;
};
function App() {
    return (
        <Router>
            <ScrollToTop>
                <GlobalStyles>
                    <Routes>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = Default;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <PrivateRoute>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </PrivateRoute>
                                    }
                                />
                            );
                        })}
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<Page />}
                                />
                            );
                        })}
                        <Route
                            path="*"
                            element={
                                <Default>
                                    <NotFound />
                                </Default>
                            }
                        />
                    </Routes>
                </GlobalStyles>
            </ScrollToTop>
        </Router>
    );
}

export default App;
