import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";

import { Avatar } from "@mui/material";
import styles from "./AccountComment.module.scss";
import classNames from "classnames/bind";
import VerifiedIcon from "@mui/icons-material/Verified";
import timeAgo from "../../utils/timeFormat";

const cx = classNames.bind(styles);

const AccountComment = ({
    avatar,
    username,
    tick,
    content,
    createdAt,
    likeCount,
    reply,
}) => {
    return (
        <div className={cx("wrapper")}>
            <Link to={`/@${username}`}>
                <Avatar src={avatar} sx={{ width: 32, height: 32 }} />
            </Link>
            <div className={cx("container")}>
                <div>
                    <Link to={`/@${username}`} className={cx("user-name")}>
                        {username}
                    </Link>
                    {tick && (
                        <VerifiedIcon className={cx("check")} color="primary" />
                    )}
                    <span className={cx("content")}>
                        {reactStringReplace(
                            content,
                            /[@#](\w+)/g,
                            (match, i) => (
                                <span
                                    key={match + i}
                                    className={cx("highlight")}
                                >
                                    @{match}
                                </span>
                            )
                        )}
                    </span>
                </div>
                <span className={cx("time-ago")}>{timeAgo(createdAt)}</span>
                {likeCount && <span className={cx("like-count")}>6 likes</span>}
                {reply && <span className={cx("reply")}>Reply</span>}
            </div>
        </div>
    );
};

export default AccountComment;
