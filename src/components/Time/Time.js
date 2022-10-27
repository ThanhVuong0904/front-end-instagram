import styles from "./Time.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const Time = ({ time, fontSize, className }) => {
    const classes = cx("time-ago", className);
    return <p className={classes}>{time}</p>;
};

export default Time;
