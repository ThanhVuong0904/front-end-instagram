import Box from "@mui/material/Box";
import classNames from "classnames/bind";
import styles from "./Loader.module.scss";
import { ReactComponent as LoaderIcon } from "../../assets/icons/loader.svg";

const cx = classNames.bind(styles);
const Loader = () => {
    return (
        <Box className={cx("loader")}>
            <LoaderIcon />
        </Box>
    );
};

export default Loader;
