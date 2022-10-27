import * as yup from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, FastField } from "formik";

import { login } from "../../store/auth";

import classNames from "classnames/bind";
import styles from "./Login.module.scss";

import images from "../../assets/images";

import InputField from "../../components/Input/Input";
import FacebookIcon from "@mui/icons-material/Facebook";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "../../components/Box/Box";
import Footer from "../../layouts/components/Footer/Footer";
import routes from "../../routes/config";

const cx = classNames.bind(styles);

const schemaLogin = yup.object().shape({
    email: yup.string().email().required("Email is required field"),
    password: yup.string().required("Password is required field"),
});

const initValue = {
    email: "",
    password: "",
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth, error, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);
    const handleSubmit = (values) => {
        dispatch(login(values));
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {/* Images */}
                <div className={cx("left")}>
                    <img src={images.login.child3} alt="" />
                </div>
                {/* Form login */}
                <div className={cx("right")}>
                    <div className={cx("wraper-form")}>
                        <div className={cx("logo")}>
                            <img src={images.logo} alt="" />
                        </div>
                        <Formik
                            initialValues={initValue}
                            validationSchema={schemaLogin}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {(formikProps) => {
                                const { dirty } = formikProps;
                                return (
                                    <Form>
                                        <FastField
                                            name="email"
                                            placehoder="Email"
                                            component={InputField}
                                        />
                                        <FastField
                                            name="password"
                                            placehoder="Password"
                                            type="password"
                                            component={InputField}
                                        />
                                        <div className={cx("form-actions")}>
                                            <LoadingButton
                                                className={cx("btn-login", {
                                                    disabled: !dirty,
                                                })}
                                                loading={loading}
                                                type="submit"
                                                variant="contained"
                                                disabled={!dirty}
                                            >
                                                Log In
                                            </LoadingButton>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>

                        <div className={cx("divider")}>
                            <div className={cx("divider-left")}></div>
                            <div className={cx("divider-content")}>OR</div>
                            <div className={cx("divider-right")}></div>
                        </div>

                        <div className={cx("login-facebook")}>
                            <FacebookIcon />
                            <span>Log in with Facebook</span>
                        </div>
                        {/* error login */}
                        {error && (
                            <p className={cx("error-message")}>{error}</p>
                        )}
                        <span className={cx("forgot-password")}>
                            Forgot password?
                        </span>
                    </div>
                    <Box className={cx("go-signup")}>
                        <span>Don't have an account?</span>&nbsp;
                        <Link to={`${routes.signUp}`}>Sign up</Link>
                    </Box>

                    <div className={cx("app-download")}>
                        <span className={cx("app-title")}>Get the app.</span>
                        <div className={cx("app-store")}>
                            <img
                                src={images.appStore}
                                alt="Apple"
                                className={cx("app-logo")}
                            />
                            <img
                                src={images.chPlay}
                                alt="Android"
                                className={cx("app-logo")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className={cx("footer")}>
                <Footer />
            </div>
        </div>
    );
};

export default Login;
