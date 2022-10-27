import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Avatar } from "@mui/material";
import MediaIcon from "../../assets/images/media.jpg";
import AppleIcon from "../../assets/images/apple-app.png";
import CHPlayIcon from "../../assets/images/ch-play.png";

import InfiniteScroll from "react-infinite-scroll-component";

import { ReactComponent as FollowingIcon } from "../../assets/icons/following.svg";
import { ReactComponent as DownChevronIcon } from "../../assets/icons/down-chevron.svg";
import { ReactComponent as OptionsIcon } from "../../assets/icons/options.svg";
import { ReactComponent as GearIcon } from "../../assets/icons/gear.svg";

import Tab from "../../components/Tab/Tab";
import Grid from "../../components/Grid/Grid";
import Button from "../../components/Button/Button";
import PopupUnfollow from "../../components/PopupUnfollow/PopupUnfollow";
import Loader from "../../components/Loader/Loader";

import { useGetUserInfo } from "../../queries/user";
import { useGetPostsOfUser } from "../../queries/post";
import { useFollow, useUnFollow } from "../../mutations/follow";

import Followings from "../../components/PopupFollowAndFollowing/Followings";
import Followers from "../../components/PopupFollowAndFollowing/Followers";

const cx = classNames.bind(styles);

const Profile = () => {
    const { username: params } = useParams();
    const [user, setUser] = useState({});
    const [toggleModalUnfollow, setToggleModalUnfollow] = useState(false);
    const [toggleModalShowFollowings, setToggleModalShowFollowings] =
        useState(false);
    const [toggleModalShowFollowers, setToggleModalShowFollowers] =
        useState(false);

    const {
        data: userInfo,
        refetch: refetchUser,
        isLoading,
    } = useGetUserInfo(params);

    const {
        data: posts,
        fetchNextPage,
        hasNextPage,
        isLoading: loadingPost,
    } = useGetPostsOfUser({
        currentPage: 1,
        username: params,
    });
    const { mutate: FollowUser } = useFollow();
    const { mutate: UnfollowUser } = useUnFollow();

    useEffect(() => {
        refetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    useEffect(() => {
        userInfo && setUser(userInfo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);

    const GetPostsOfUser = useMemo(() => {
        return posts?.pages?.reduce((prev, curr) => {
            return prev.concat(curr.data);
        }, []);
    }, [posts]);

    const handleFollow = async () => {
        FollowUser(user._id, {
            onSuccess(response) {
                setUser({
                    ...user,
                    isFollow: true,
                    followersCount: user.followersCount + 1,
                });
            },
        });
    };
    const handleUnfollow = async () => {
        UnfollowUser(user._id, {
            onSuccess(response) {
                setUser({
                    ...user,
                    isFollow: false,
                    followersCount: user.followersCount - 1,
                });
                setToggleModalUnfollow(false);
            },
        });
    };
    const handleOpenModalUnfollow = () => {
        setToggleModalUnfollow(true);
    };

    const handleGetFollowings = () => {
        setToggleModalShowFollowings(true);
    };

    const handleGetFollowers = () => {
        setToggleModalShowFollowers(true);
    };
    if (isLoading && loadingPost) {
        return <Loader />;
    }
    return (
        <>
            <Helmet
                defaultTitle={`${user?.name} (@${user?.username}) • Instagram photos and videos`}
            >
                {/* LISA (@lalalalisa_m) • Instagram photos and videos */}
            </Helmet>
            {user && toggleModalUnfollow && (
                <PopupUnfollow
                    isOpen={toggleModalUnfollow}
                    onClose={() => setToggleModalUnfollow(false)}
                    onUnfollow={handleUnfollow}
                    user={user}
                />
            )}
            {user && toggleModalShowFollowings && (
                <Followings
                    open={toggleModalShowFollowings}
                    userId={user._id}
                    onClose={() => setToggleModalShowFollowings(false)}
                />
            )}

            {user && toggleModalShowFollowers && (
                <Followers
                    open={toggleModalShowFollowers}
                    userId={user._id}
                    onClose={() => setToggleModalShowFollowers(false)}
                />
            )}

            <div className={cx("wrapper")}>
                <div className={cx("container")}>
                    {userInfo && (
                        <div className={cx("header")}>
                            <div className={cx("avatar")}>
                                <Avatar
                                    className={cx("ava-img")}
                                    src={userInfo.avatar}
                                    alt={userInfo.name}
                                />
                            </div>
                            <div className={cx("info")}>
                                <div className={cx("info-item")}>
                                    <h4 className={cx("username")}>
                                        <span>{userInfo.username}</span>
                                        {userInfo.tick && (
                                            <VerifiedIcon
                                                style={{ margin: "0 6px" }}
                                                color="primary"
                                            />
                                        )}
                                    </h4>
                                    {user?.isMe && (
                                        <>
                                            <Button
                                                outline
                                                style={{ marginLeft: "10px" }}
                                            >
                                                Edit profile
                                            </Button>
                                            <Button>
                                                <GearIcon />
                                            </Button>
                                        </>
                                    )}

                                    {!user?.isMe && (
                                        <>
                                            <Button outline>Message</Button>

                                            {user?.isFollow ? (
                                                <Button
                                                    outline
                                                    onClick={
                                                        handleOpenModalUnfollow
                                                    }
                                                >
                                                    <FollowingIcon />
                                                </Button>
                                            ) : (
                                                <Button
                                                    primary
                                                    style={{
                                                        padding: "5px 25px",
                                                    }}
                                                    onClick={handleFollow}
                                                >
                                                    Follow
                                                </Button>
                                            )}
                                            <Button outline>
                                                <DownChevronIcon />
                                            </Button>
                                            <Button
                                                className={cx("options-icon")}
                                            >
                                                <OptionsIcon />
                                            </Button>
                                        </>
                                    )}
                                </div>

                                <div
                                    className={cx("info-item")}
                                    style={{ marginTop: 20 }}
                                >
                                    <p className={cx("user-info")}>
                                        <span>{userInfo.postCount}</span> posts
                                    </p>
                                    <p
                                        className={cx("user-info")}
                                        style={{ cursor: "pointer" }}
                                        onClick={handleGetFollowers}
                                    >
                                        <span>{userInfo.followersCount}</span>{" "}
                                        followers
                                    </p>
                                    <p
                                        className={cx("user-info")}
                                        style={{ cursor: "pointer" }}
                                        onClick={handleGetFollowings}
                                    >
                                        <span>{userInfo.followingsCount}</span>{" "}
                                        following
                                    </p>
                                </div>

                                <div
                                    className={cx("info-item", "name")}
                                    style={{ marginTop: 20 }}
                                >
                                    {user.name}
                                </div>
                                <div
                                    className={cx("info-item")}
                                    style={{ whiteSpace: "pre-line" }}
                                >
                                    {userInfo.bio}
                                </div>
                                <div className={cx("info-item", "website")}>
                                    {userInfo.website}
                                </div>
                            </div>
                        </div>
                    )}

                    {GetPostsOfUser && (
                        <>
                            <Tab posts={GetPostsOfUser} />
                            <InfiniteScroll
                                dataLength={GetPostsOfUser?.length || 0}
                                hasMore={hasNextPage}
                                next={fetchNextPage}
                                loader={<Loader />}
                            >
                                <Grid data={GetPostsOfUser} />
                            </InfiniteScroll>
                        </>
                    )}
                    {GetPostsOfUser && GetPostsOfUser?.length === 0 && (
                        <div className={cx("no-posts")}>
                            <img src={MediaIcon} alt="" />
                            <div className={cx("no-posts-right")}>
                                <h2>
                                    Start capturing and sharing your moments.
                                </h2>
                                <h3>
                                    Get the app to share your first photo or
                                    video.
                                </h3>
                                <div style={{ display: "flex" }}>
                                    <img
                                        src={AppleIcon}
                                        alt=""
                                        className={cx("app-logo")}
                                    />
                                    <img
                                        src={CHPlayIcon}
                                        alt=""
                                        className={cx("app-logo")}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
