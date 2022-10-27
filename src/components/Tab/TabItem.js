import classNames from "classnames/bind";
import styles from "./Tab.module.scss";

const cx = classNames.bind(styles);

const TabItem = ({ data, onChange, active }) => {
    return (
        <div
            className={cx("tab-item", { active: active === data.title })}
            onClick={() => onChange(data.title)}
        >
            <span className={cx("tab-icon")}>{data.icon}</span>

            <span className={cx("tab-title")}>{data.title}</span>
        </div>
    );
};

export default TabItem;
