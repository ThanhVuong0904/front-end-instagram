import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { ReactComponent as Logo } from "../../../assets/icons/instagram.svg";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/profile.svg";
import { ReactComponent as SavedIcon } from "../../../assets/icons/saved.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/icons/settings.svg";
import { ReactComponent as SwitchAccountIcon } from "../../../assets/icons/switch.svg";
import {
    ActivityFeedIcon,
    ExploreIcon,
    ExploreIconActive,
    HomeIcon,
    HomeIconActive,
    MessageIcon,
    MessageIconActive,
    NewPostIcon,
} from "../../../components/Icon";
import Search from "../Search/Search";

import { Avatar } from "@mui/material";
import Menu from "../Menu/Menu";
import CreatePost from "../../../pages/CreatePost/CreatePost";
import { useGetCurrentUser } from "../../../queries/user";
import { useEffect } from "react";
import { clearToken } from "../../../utils/storage";

const cx = classNames.bind(styles);

const NAVS = [
    { path: "/", icon: <HomeIcon />, activeIcon: <HomeIconActive /> },
    {
        path: "/inbox",
        icon: <MessageIcon />,
        activeIcon: <MessageIconActive />,
    },
    { model: true, icon: <NewPostIcon />, activeIcon: <NewPostIcon /> },
    {
        path: "/explore",
        icon: <ExploreIcon />,
        activeIcon: <ExploreIconActive />,
    },
    {
        path: "/activity",
        icon: <ActivityFeedIcon />,
        activeIcon: <ActivityFeedIcon />,
    },
];

const Header = () => {
    const { data } = useGetCurrentUser();
    const [user, setUser] = useState();
    const [toggleNewPost, setToggleNewPost] = useState(false);

    useEffect(() => {
        setUser(data);
    }, [data]);

    const handleOpen = () => setToggleNewPost(true);
    const handleClose = () => setToggleNewPost(false);
    const handleLogout = () => {
        clearToken();
        window.location.replace("/");
    };
    const USER_MENU = [
        {
            path: `/@${user?.username}`,
            icon: <ProfileIcon />,
            title: "Profile",
        },
        { path: `/saved`, icon: <SavedIcon />, title: "Saved" },
        { path: `/accounts/edit/`, icon: <SettingsIcon />, title: "Settings" }, //chưa config
        {
            icon: <SwitchAccountIcon />,
            title: "Switch accounts",
        },
        { title: "Logout", separate: true, onClick: handleLogout },
    ];

    return (
        <header className={cx("wrapper")}>
            {toggleNewPost && (
                <CreatePost isOpen={toggleNewPost} onClose={handleClose} />
            )}
            <div className={cx("container")}>
                <Link to="/" className={cx("logo")}>
                    <Logo />
                </Link>
                {/* Search */}
                <Search />
                {/* Actions */}
                <div className={cx("nav")}>
                    {NAVS.map((element, index) => {
                        return element.path ? (
                            <NavLink
                                key={index}
                                to={element.path}
                                className={(nav) =>
                                    cx("nav-item", { active: nav.isActive })
                                }
                            >
                                <span className={cx("icon")}>
                                    {element.icon}
                                </span>
                                <span className={cx("active-icon")}>
                                    {element.activeIcon}
                                </span>
                            </NavLink>
                        ) : (
                            <div
                                className={cx("nav-item")}
                                onClick={handleOpen}
                                key={index}
                            >
                                <span className={cx("icon")}>
                                    {element.icon}
                                </span>
                                <span className={cx("active-icon")}>
                                    {element.activeIcon}
                                </span>
                            </div>
                        );
                    })}

                    {user && (
                        <Menu items={USER_MENU}>
                            <Avatar
                                style={{ width: 24, height: 24 }}
                                className={cx("avatar")}
                                src={user.avatar}
                            />
                        </Menu>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
