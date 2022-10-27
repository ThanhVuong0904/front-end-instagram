import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

const MenuItem = ({ data }) => {
    const classes = cx("menu-item", { separate: data.separate });
    return data.path ? (
        <Link to={data.path} className={classes}>
            <span>{data.icon}</span>
            {data.title}
        </Link>
    ) : (
        <div className={classes} onClick={data.onClick}>
            <span>{data.icon}</span>
            {data.title}
        </div>
    );
};

export default MenuItem;
