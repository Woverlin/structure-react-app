import { notification } from "antd";
import "antd/dist/antd.css";
import Layout from "components/Layout";
import Loading from "components/Loading";
import Home from "pages/Home";
import Login from "pages/Login";
import MenuItem from "pages/MenuItem";
import NotFound from "pages/NotFound";
import React, { memo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { getRedux } from 'scripts/helpers';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "scripts/routes";

import "tailwindcss/tailwind.css";
// import "./styles/App.scss";

// import './assets/css/bootstrap.min.css';
// import './assets/scss/index.scss';

notification.config({
    placement: "bottomLeft",
    duration: 5,
});

const App = () => {
    // const { loading }: any = getRedux(`App`, {});
    const loading = false;

    // useEffect(() => {
    //     i18next.changeLanguage(currentLanguage);
    // }, [currentLanguage]);

    console.log("PUBLIC_ROUTES", PUBLIC_ROUTES);

    //   const { Public, Private } = RouteCpn;

    function PrivateRoute({ children }: any) {
        const auth = true;
        return auth ? children : <Navigate to="/login" />;
    }

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/menu-item/:id"
                        element={
                            <PrivateRoute>
                                <MenuItem />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
            {loading && <Loading />}
        </BrowserRouter>
    );
};
export default memo(App);
