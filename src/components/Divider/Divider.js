import classNames from "classnames/bind";
import styles from "./Divider.module.scss";

const cx = classNames.bind(styles);

const Divider = ({ content }) => {
    return (
        <div className={cx("divider")}>
            <div className={cx("divider-left")}></div>
            <div className={cx("divider-content")}>{content}</div>
            <div className={cx("divider-right")}></div>
        </div>
    );
};

export default Divider;
