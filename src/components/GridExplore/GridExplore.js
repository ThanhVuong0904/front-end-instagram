import classNames from "classnames/bind";
import styles from "./GridExplore.module.scss";
import PostGrid from "../Post/PostGrid";

const cx = classNames.bind(styles);

const GridExplore = ({ array }) => {
    function separateIt(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            var sliceIt = arr.slice(i, i + size);
            newArr.push(sliceIt);
        }
        return newArr;
    }
    return (
        <>
            {separateIt(array, 5).map((item, index) => (
                <div
                    key={index}
                    className={cx("grid", {
                        reverse: index % 2 !== 0,
                        first: index % 2 === 0,
                    })}
                >
                    {item.map((data) => (
                        <div className={cx("grid-item")} key={data._id}>
                            <PostGrid data={data} />
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default GridExplore;
