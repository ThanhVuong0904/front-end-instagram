import { Avatar } from "@mui/material";
import React, { useMemo } from "react";
import { useGetFollowers } from "../../queries/follow";
import Button from "../Button/Button";
import styles from "./Popup.module.scss";
import classNames from "classnames/bind";
import Popup from "./Popup";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const cx = classNames.bind(styles);

const Followers = ({ open, onClose, userId }) => {
    const { data: getFollowers, isLoading } = useGetFollowers({
        userId,
        currentPage: 1,
    });
    console.log({ getFollowers });
    const GetFollowers = useMemo(() => {
        return getFollowers?.pages?.reduce((prev, curr) => {
            return prev.concat(curr.data);
        }, []);
    }, [getFollowers]);

    return (
        <Popup open={open} onClose={onClose} title="Followers">
            {isLoading && <Loader />}
            {GetFollowers &&
                GetFollowers.map((user, index) => (
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
            {GetFollowers && GetFollowers.length === 0 && (
                <h1>You haven't followed anyone yet</h1>
            )}
        </Popup>
    );
};

export default Followers;
