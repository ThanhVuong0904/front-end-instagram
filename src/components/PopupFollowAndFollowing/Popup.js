import { Dialog } from "@mui/material";

import styles from "./Popup.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Popup = ({ title, children, open, onClose }) => {
    return (
        <>
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth="xs"
                onClose={onClose}
            >
                <div className={cx("heading")}>
                    <h1>{title}</h1>
                </div>
                <div className={cx("container")}>{children}</div>
            </Dialog>
        </>
    );
};

export default Popup;
