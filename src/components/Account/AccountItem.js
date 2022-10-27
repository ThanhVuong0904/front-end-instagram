import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import Image from "../Image";
import VerifiedIcon from "@mui/icons-material/Verified";

const cx = classNames.bind(styles);

const AccountItem = ({ username, name, tick, avatar }) => {
    return (
        <Link to={`/@${username}`} className={cx("wrapper")}>
            <Image className={cx("avatar")} src={avatar} alt={name} />

            <div className={cx("info")}>
                <h4 className={cx("username")}>
                    <span>{username}</span>
                    {tick && (
                        <VerifiedIcon className={cx("check")} color="primary" />
                    )}
                </h4>
                <span className={cx("name")}>{name}</span>
            </div>
        </Link>
    );
};

export default AccountItem;
