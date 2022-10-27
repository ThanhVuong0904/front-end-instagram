import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Slider from "react-slick";

import Box from "@mui/material/Box";
import { Dialog, Avatar } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

import styles from "./PopupPost.module.scss";
import classNames from "classnames/bind";

import PostActions from "../PostActions/PostActions";
import AccountComment from "../Account/AccountComment";

import Time from "../Time/Time";
import AddComment from "../AddComment/AddComment";
import { NextPrevious, PrevPrevious } from "../ArrowButton/ArrowButton";
import { useGetPostComments } from "../../queries/comment";

import { ReactComponent as LoadMoreIcon } from "../../assets/icons/load-more.svg";
import { useCreateComment } from "../../mutations/comment";
import { useReactionPost } from "../../mutations/post";
import { useFollow } from "../../mutations/follow";
import { useGetPost } from "../../queries/post";
import { useEffect } from "react";

const cx = classNames.bind(styles);
const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextPrevious right="10px" />,
    prevArrow: <PrevPrevious left="10px" />,
    dots: true,
    dotsClass: `slick-dots custom-dots dot-white`,
};

const PopupPost = ({
    data,
    open,
    onClose,
    onRefreshIsReaction,
    onRefreshCommentsCount,
    onRefreshLikesCount,
}) => {
    const {
        data: commentsOfPost,
        fetchNextPage,
        hasNextPage,
        refetch,
    } = useGetPostComments({
        postId: data._id,
        perPage: 2,
        currentPage: 1,
    });

    const { data: post, refetch: refetchPost } = useGetPost(data._id);

    const [reacted, setReacted] = useState(() => {
        return data.isReaction;
    });
    const [totalLikes, setTotalLikes] = useState(() => {
        return data.likesCount;
    });
    const { mutate: commentPost } = useCreateComment();
    const { mutate: reactionPost } = useReactionPost();
    const { mutate: followUser } = useFollow();

    const GetCommentsOfPost = useMemo(() => {
        return commentsOfPost?.pages?.reduce((prev, curr) => {
            return prev.concat(curr.data);
        }, []);
    }, [commentsOfPost]);

    useEffect(() => {
        if (post) {
            setReacted(post.isReaction);
            setTotalLikes(post.likesCount);
        }
    }, [post]);

    const handleLike = async () => {
        reactionPost(data._id, {
            onSuccess(response) {
                setReacted(response.data.isReaction);
                setTotalLikes(response.data.likesCount);
                onRefreshLikesCount(response.data.likesCount);
                onRefreshIsReaction(response.data.isReaction);
                refetchPost();
            },
        });
    };
    const handleComment = async (commentValue) => {
        commentPost(
            { postId: data._id, comment: commentValue },
            {
                onSuccess(response) {
                    refetch();
                    onRefreshCommentsCount((prev) => prev + 1);
                },
            }
        );
    };

    const handleFollow = () => {
        followUser(data.user._id, {
            onSuccess(res) {
                refetchPost();
            },
        });
    };
    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    useEffect(() => {
        console.log("commentsOfPost: ", commentsOfPost);
    }, [commentsOfPost]);
    return (
        <>
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={"md"}
                onClose={onClose}
            >
                {/* <img src={myPost?.postAssets[0]} alt="" /> */}
                {post && (
                    <Box className={cx("wrapper")}>
                        <Slider
                            {...settings}
                            className={cx("post-asset-slider")}
                        >
                            {post.postAssets.map((image, index) => (
                                <img
                                    src={image}
                                    alt="post-img"
                                    key={index}
                                    className={cx("post-image")}
                                />
                            ))}
                        </Slider>

                        <div className={cx("content")}>
                            <div className={cx("header")}>
                                <Link
                                    className={cx("user")}
                                    to={`/@${data.user.username}`}
                                >
                                    <Avatar
                                        src={data.user.avatar}
                                        sx={{ width: 32, height: 32 }}
                                    />
                                    <span className={cx("user-name")}>
                                        {data.user.username}
                                    </span>
                                </Link>
                                {data.user.tick && (
                                    <VerifiedIcon
                                        className={cx("check")}
                                        color="primary"
                                    />
                                )}
                                {!post.user.isFollow && (
                                    <>
                                        <span className={cx("dot")}>•</span>
                                        <button onClick={handleFollow}>
                                            Follow
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className={cx("comments")}>
                                {data.description.trim() && (
                                    <AccountComment
                                        key={data._id}
                                        avatar={data.user.avatar}
                                        tick={data.user.tick}
                                        username={data.user.username}
                                        content={data.description}
                                        createdAt={data.createdAt}
                                    />
                                )}
                                {GetCommentsOfPost &&
                                    GetCommentsOfPost.map((comment) => (
                                        <AccountComment
                                            key={comment._id}
                                            avatar={comment.user.avatar}
                                            tick={comment.user.tick}
                                            username={comment.user.username}
                                            content={comment.content}
                                            createdAt={comment.createdAt}
                                            reply
                                            likeCount={6}
                                        />
                                    ))}
                                {hasNextPage && (
                                    <div
                                        className={cx("loadmore")}
                                        onClick={fetchNextPage}
                                    >
                                        <LoadMoreIcon />
                                    </div>
                                )}
                            </div>
                            <div className={cx("post-actions")}>
                                <PostActions
                                    isReaction={reacted}
                                    onReaction={handleLike}
                                />
                                <p className={cx("likes-count")}>
                                    {totalLikes} likes
                                </p>
                                <Time
                                    time={moment(data.createdAt).fromNow()}
                                    fontSize={14}
                                />
                            </div>
                            <AddComment
                                onComment={handleComment}
                                classname={cx("post-add-comment")}
                            />
                        </div>
                    </Box>
                )}
            </Dialog>
        </>
    );
};

export default PopupPost;
