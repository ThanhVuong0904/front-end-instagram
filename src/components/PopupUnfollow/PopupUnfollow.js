import { Dialog, Avatar } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./PopupUnfollow.module.scss";
import Button from "../Button/Button";

const cx = classNames.bind(styles);

const PopupUnfollow = ({ isOpen, onClose, onUnfollow, user }) => {
    return (
        <Dialog maxWidth="xs" fullWidth={true} open={isOpen} onClose={onClose}>
            <div className={cx("container")}>
                <div className={cx("avatar")}>
                    <Avatar src={user.avatar} />
                </div>
                <p style={{ padding: "20px 0" }}>Unfollow @{user.username}?</p>

                <div className={cx("btn")} onClick={onUnfollow}>
                    <Button style={{ color: "rgb(237, 73, 86)" }}>
                        Unfollow
                    </Button>
                </div>
                <div className={cx("btn")} onClick={onClose}>
                    <Button>Cancel</Button>
                </div>
            </div>
        </Dialog>
    );
};

export default PopupUnfollow;
