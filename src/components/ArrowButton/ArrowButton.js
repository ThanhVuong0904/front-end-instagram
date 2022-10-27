import classNames from "classnames/bind";
import styles from "./ArrowButton.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const cx = classNames.bind(styles);

export function NextPrevious({
    className,
    onClick,
    top,
    left,
    right,
    bottom,
    styles,
}) {
    const classes = cx("btn-arrow", className);
    return (
        <div
            className={classes}
            onClick={onClick}
            style={{ ...styles, top, left, right, bottom }}
        >
            <ArrowForwardIosIcon style={{ width: "1rem", height: "1rem" }} />
        </div>
    );
}

export function PrevPrevious({ className, onClick, top, left, right, bottom }) {
    const classes = cx("btn-arrow", className);
    return (
        <div
            className={classes}
            onClick={onClick}
            style={{ top, left, right, bottom }}
        >
            <ArrowBackIosNewIcon style={{ width: "1rem", height: "1rem" }} />
        </div>
    );
}
