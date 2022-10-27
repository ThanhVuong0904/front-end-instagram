import styles from "./Box.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Box = ({ children, className }) => {
    return <div className={cx("wrapper", className)}>{children}</div>;
};

export default Box;
