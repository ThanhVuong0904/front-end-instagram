import * as yup from "yup";
import { useEffect } from "react";
import { Formik, Form, FastField } from "formik";
import { useDispatch, useSelector } from "react-redux";

import classNames from "classnames/bind";
import styles from "./SignUp.module.scss";
import images from "../../assets/images";

import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";

import FacebookIcon from "@mui/icons-material/Facebook";
import Divider from "../../components/Divider/Divider";
import InputField from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../routes/config";
import Footer from "../../layouts/components/Footer/Footer";
import { signup } from "../../store/auth";

const cx = classNames.bind(styles);

const schemaLogin = yup.object().shape({
    email: yup.string().email().required("Email is required field"),
    password: yup.string().required("Password is required field"),
});

const initValue = {
    email: "",
    password: "",
};

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { auth, error } = useSelector((state) => state.auth);
    useEffect(() => {
        auth && navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);
    const handleSubmit = (values) => {
        dispatch(signup(values));
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <Box className={cx("form")}>
                    <div className={cx("logo")}>
                        <img src={images.logo} alt="" />
                    </div>
                    <div style={{ margin: "0 40px" }}>
                        <h2 className={cx("heading")}>
                            Sign up to see photos and videos from your friends.
                        </h2>
                        <div className={cx("login-facebook")}>
                            <FacebookIcon />
                            <span>Log in with Facebook</span>
                        </div>
                        <Divider content="OR" />

                        <Formik
                            initialValues={initValue}
                            validationSchema={schemaLogin}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {(formikProps) => {
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
                                        {error && (
                                            <p className={cx("error-message")}>
                                                {error}
                                            </p>
                                        )}
                                        <p className={cx("privacy")}>
                                            People who use our service may have
                                            uploaded your contact information to
                                            Instagram. Learn More
                                        </p>
                                        <p className={cx("privacy")}>
                                            By signing up, you agree to our
                                            Terms , Privacy Policy and Cookies
                                            Policy .
                                        </p>

                                        <Button
                                            primary
                                            className={cx("signup")}
                                            type="submit"
                                        >
                                            Sign up
                                        </Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </Box>
                <Box className={cx("go-login")}>
                    <span>Have an account?</span>&nbsp;
                    <Link to={`${routes.login}`}>Log in</Link>
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
            <div className={cx("footer")}>
                <Footer />
            </div>
        </div>
    );
};

export default SignUp;
