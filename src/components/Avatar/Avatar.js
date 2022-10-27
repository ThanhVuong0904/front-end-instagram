import classNames from "classnames/bind";
import styles from "./Avatar.module.scss";
import Jennie from "../../assets/images/jennie.jpg";

const cx = classNames.bind(styles);
const Avatar = ({ avatar, isStory, className }) => {
    return (
        <div className={cx("wrapper", className)}>
            <img src={avatar} alt="" />
        </div>
    );
};

export default Avatar;
