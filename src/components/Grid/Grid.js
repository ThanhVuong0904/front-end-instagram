import classNames from "classnames/bind";
import PostGrid from "../Post/PostGrid";
import styles from "./Grid.module.scss";

const cx = classNames.bind(styles);

const Grid = ({ data }) => {
    return (
        <div className={cx("grid")}>
            {data.map((item, index) => (
                <PostGrid key={index} data={item} />
            ))}
        </div>
    );
};

export default Grid;
