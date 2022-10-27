import classNames from "classnames/bind";
import styles from "./Default.module.scss";
import Header from "../components/Header/Header";

const cx = classNames.bind(styles);

const Default = ({ children }) => {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("content")}>{children}</div>
        </div>
    );
};

export default Default;
