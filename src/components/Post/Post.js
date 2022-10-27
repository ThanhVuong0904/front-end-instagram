import { useState } from "react";
import { useReactionPost } from "../../mutations/post";
import { useCreateComment } from "../../mutations/comment";
import { useGetLimitComment } from "../../queries/comment";
import reactStringReplace from "react-string-replace";

import moment from "moment";
import Box from "../Box/Box";
import styles from "./Post.module.scss";
import classNames from "classnames/bind";
import Avatar from "../Avatar/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextPrevious, PrevPrevious } from "../ArrowButton/ArrowButton";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import AddComment from "../AddComment/AddComment";
import PostActions from "../PostActions/PostActions";
import Time from "../Time/Time";
import PopupPost from "../PopupPost/PopupPost";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const settings = {
    // infinite: posts.length > 6,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextPrevious right="10px" />,
    prevArrow: <PrevPrevious left="10px" />,
    dots: true,
    dotsClass: `slick-dots custom-dots dot-blue`,
};

const Post = ({ data }) => {
    const { likesCount, commentsCount, isReaction } = data;
    const { data: commentsOfPost, refetch } = useGetLimitComment({
        postId: data._id,
        perPage: 2,
        currentPage: 1,
    });

    const { mutate: reactionPost } = useReactionPost();
    const { mutate: commentPost } = useCreateComment();

    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [reacted, setReacted] = useState(() => {
        return isReaction;
    });
    const [totalLikes, setTotalLikes] = useState(() => {
        return likesCount;
    });
    const [totalComments, setTotalComments] = useState(() => {
        return commentsCount;
    });

    const handleReaction = async () => {
        reactionPost(data._id, {
            onSuccess(response) {
                setReacted(response.data.isReaction);
                setTotalLikes(response.data.likesCount);
            },
        });
    };
    const handleComment = async (commentValue) => {
        commentPost(
            { postId: data._id, comment: commentValue },
            {
                onSuccess(response) {
                    refetch();
                    setTotalComments((prev) => prev + 1);
                },
            }
        );
    };

    return (
        <>
            {isOpenPopup && (
                <PopupPost
                    data={data}
                    open={isOpenPopup}
                    onClose={() => setIsOpenPopup(false)}
                    onReaction={handleReaction}
                    onRefreshCommentsCount={setTotalComments}
                    onRefreshLikesCount={setTotalLikes}
                    onRefreshIsReaction={setReacted}
                />
            )}

            <Box className={cx("post-wrapper")}>
                <Link
                    to={`/@${data.user.username}`}
                    className={cx("post-header")}
                >
                    <div>
                        <Avatar
                            avatar={data.user.avatar}
                            className={cx("post-avatar")}
                        />
                        <span className={cx("post-username")}>
                            {data.user.username}
                        </span>
                    </div>
                    <MoreHorizIcon />
                </Link>

                <Slider {...settings}>
                    {data.postAssets.map((image, index) => (
                        <img
                            key={index}
                            className={cx("post-image")}
                            src={image}
                            alt=""
                        />
                    ))}
                </Slider>

                <div className={cx("post-content")}>
                    <PostActions
                        isReaction={reacted}
                        onReaction={handleReaction}
                    />
                    <p className={cx("post-text-700")}>{totalLikes} likes</p>
                    <p>
                        <span className={cx("post-text-700")}>
                            {data.user.username}
                        </span>
                        &nbsp;
                        {reactStringReplace(
                            data.description,
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
                    </p>
                    <p
                        className={cx("post-view-comment")}
                        onClick={() => setIsOpenPopup(true)}
                    >
                        View all {totalComments} comments
                    </p>
                    {commentsOfPost &&
                        commentsOfPost.map((comment) => (
                            <p key={comment._id}>
                                <span className={cx("post-text-700")}>
                                    {comment.user.username}
                                </span>
                                &nbsp;
                                {comment.content}
                            </p>
                        ))}
                    <Time
                        className={cx("post-publish")}
                        time={moment(data.createdAt).fromNow()}
                        fontSize={14}
                    />
                </div>

                <AddComment onComment={handleComment} />
            </Box>
        </>
    );
};

// Loading skeleton
export const Loading = () => {
    return (
        <Box className={cx("post-wrapper")}>
            <div className={cx("post-header")}>
                <div>
                    <Skeleton circle className={cx("post-avatar")} />
                    <Skeleton width={100} />
                </div>
            </div>
            <Skeleton height={470} />
        </Box>
    );
};

export default Post;
