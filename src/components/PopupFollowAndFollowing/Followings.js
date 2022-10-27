import { Avatar } from "@mui/material";
import React, { useMemo } from "react";
import { useGetFollowings } from "../../queries/follow";
import Button from "../Button/Button";
import styles from "./Popup.module.scss";
import classNames from "classnames/bind";
import Popup from "./Popup";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const cx = classNames.bind(styles);

const Followings = ({ open, onClose, userId }) => {
    const { data: getFollowings, isLoading } = useGetFollowings({
        userId,
        currentPage: 1,
    });

    console.log({ getFollowings });

    const GetFollowings = useMemo(() => {
        return getFollowings?.pages?.reduce((prev, curr) => {
            return prev.concat(curr.data);
        }, []);
    }, [getFollowings]);

    return (
        <Popup open={open} onClose={onClose} title="Followings">
            {isLoading && <Loader />}
            {GetFollowings &&
                GetFollowings.map((user, index) => (
                    <div className={cx("item")} key={index}>
                        <Link to={`../@${user.username}`} onClick={onClose}>
                            <Avatar
                                className={cx("avatar")}
                                src={user.avatar}
                            />
                        </Link>
                        <div>
                            <Link
                                to={`../@${user.username}`}
                                className={cx("username")}
                                onClick={onClose}
                            >
                                {user.username}
                            </Link>
                            <p className={cx("name")}>{user.name}</p>
                        </div>
                        {!user.isMe &&
                            (user.isFollow ? (
                                <Button className={cx("btn-action")} outline>
                                    Following
                                </Button>
                            ) : (
                                <Button className={cx("btn-action")} primary>
                                    Follow
                                </Button>
                            ))}
                    </div>
                ))}
            {GetFollowings && GetFollowings.length === 0 && (
                <h1>No one is following</h1>
            )}
        </Popup>
    );
};

export default Followings;
