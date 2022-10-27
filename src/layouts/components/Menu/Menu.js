import React from "react";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../../../components/Popper";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
const cx = classNames.bind(styles);

const Menu = ({
    children,
    items = [],
    hideOnClick = false,
    onChange,
    ...passProps
}) => {
    const renderItems = () => {
        return items.map((item, index) => <MenuItem key={index} data={item} />);
    };
    return (
        <Tippy
            {...passProps}
            interactive
            // delay={[0, 700]}
            // offset={[12, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx("menu-list")} tabIndex={-1} {...attrs}>
                    <PopperWrapper className={cx("menu-popper")}>
                        <div className={cx("menu-body")}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
};

export default Menu;
