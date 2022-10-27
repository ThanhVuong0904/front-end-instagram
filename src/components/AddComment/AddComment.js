import classNames from "classnames/bind";
import Box from "../Box/Box";
import styles from "./AddComment.module.scss";
import { ReactComponent as EmojiIcon } from "../../assets/icons/emoji.svg";
import { useState } from "react";

const cx = classNames.bind(styles);

const AddComment = ({ classname, onComment }) => {
    const [commentValue, setCommentValue] = useState("");

    const handleComment = async () => {
        onComment(commentValue);
        setCommentValue("");
    };
    return (
        <Box className={cx("wrapper", classname)}>
            <EmojiIcon />
            <input
                className={cx("addcomment-input")}
                type="text"
                placeholder="Add a comment"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                onKeyDown={(e) =>
                    e.keyCode === 13 && setCommentValue(e.target.value)
                }
            />

            <button
                className={cx("btn-addcomment", {
                    disabled: commentValue.length === 0,
                })}
                disabled={commentValue.length === 0}
                onClick={handleComment}
            >
                Post
            </button>
        </Box>
    );
};

export default AddComment;
