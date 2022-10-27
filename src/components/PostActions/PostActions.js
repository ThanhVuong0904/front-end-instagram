import classNames from "classnames/bind";
import styles from "./PostActions.module.scss";
import { ReactComponent as LikeIcon } from "../../assets/icons/like.svg";
import { ReactComponent as LikeActiveIcon } from "../../assets/icons/like-active.svg";
import { ReactComponent as CommentIcon } from "../../assets/icons/comment.svg";
import { ReactComponent as ShareIcon } from "../../assets/icons/share.svg";
import { ReactComponent as SaveIcon } from "../../assets/icons/save.svg";

const cx = classNames.bind(styles);
const PostActions = ({ isReaction, onReaction }) => {
    return (
        <div className={cx("post-actions")}>
            <div>
                {isReaction ? (
                    <LikeActiveIcon onClick={onReaction} />
                ) : (
                    <LikeIcon
                        className={cx("post-icon")}
                        onClick={onReaction}
                    />
                )}
                <CommentIcon className={cx("post-icon")} />
                <ShareIcon className={cx("post-icon")} />
            </div>

            <SaveIcon />
        </div>
    );
};

export default PostActions;
