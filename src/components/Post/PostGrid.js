import { useState } from "react";
import styles from "./PostGrid.module.scss";
import classNames from "classnames/bind";
import Image from "../Image";
import PopupPost from "../PopupPost/PopupPost";
import { ReactComponent as CarouselIcon } from "../../assets/icons/carousel.svg";
import { ReactComponent as LikeCountIcon } from "../../assets/icons/like-count.svg";
import { ReactComponent as CommentCountIcon } from "../../assets/icons/comment-count.svg";

const cx = classNames.bind(styles);
const PostGrid = ({ data }) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [totalLikes, setTotalLikes] = useState(() => {
        return data.likesCount;
    });
    const [totalComments, setTotalComments] = useState(() => {
        return data.commentsCount;
    });

    return (
        <>
            {isOpenPopup && (
                <PopupPost
                    data={data}
                    open={isOpenPopup}
                    onClose={() => setIsOpenPopup(false)}
                    onRefreshCommentsCount={setTotalComments}
                    onRefreshLikesCount={setTotalLikes}
                    onRefreshIsReaction={() => {}}
                />
            )}

            <div className={cx("wrapper")} onClick={() => setIsOpenPopup(true)}>
                {data.postAssets && <Image src={data.postAssets[0]} alt="" />}
                <div className={cx("overlay")}>
                    {data.postAssets && data.postAssets.length > 0 && (
                        <CarouselIcon className={cx("icon-carousel")} />
                    )}
                    <div className={cx("info-item")}>
                        <LikeCountIcon />
                        <span>{totalLikes ? totalLikes : 0}</span>
                    </div>
                    <div className={cx("info-item")}>
                        <CommentCountIcon />
                        <span>{totalComments ? totalComments : 0}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostGrid;
