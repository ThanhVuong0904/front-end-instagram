import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";
import routes from "../../routes/config";
import Footer from "../../layouts/components/Footer/Footer";

const cx = classNames.bind(styles);

const NotFound = () => {
    return (
        <>
            <Helmet defaultTitle="Page not found • Instagram"></Helmet>
            <div className={cx("wrapper")}>
                <div className={cx("container")}>
                    <h2>Sorry, this page isn't available.</h2>
                    <p>
                        The link you followed may be broken, or the page may
                        have been removed.{" "}
                        <Link to={routes.home}>Go back to Instagram</Link>.
                    </p>
                </div>
                <div className={cx("footer")}>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default NotFound;
