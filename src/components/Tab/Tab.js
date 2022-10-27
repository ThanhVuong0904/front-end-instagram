import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Tab.module.scss";

import { ReactComponent as GridIcon } from "../../assets/icons/grid.svg";
import { ReactComponent as SavedIcon } from "../../assets/icons/saved.svg";
import { ReactComponent as TargetIcon } from "../../assets/icons/target.svg";
import TabItem from "./TabItem";

const cx = classNames.bind(styles);

const TAB_ITEM = [
    { title: "POSTS", icon: <GridIcon /> },
    { title: "SAVED", icon: <SavedIcon /> },
    { title: "TAGGED", icon: <TargetIcon /> },
];

const Tab = () => {
    const [currentTab, setCurrentTab] = useState("POSTS");
    const handleChangeTab = (tab) => {
        setCurrentTab(tab);
    };
    return (
        <div className={cx("wrapper")}>
            {TAB_ITEM.map((tab, index) => (
                <TabItem
                    key={index}
                    data={tab}
                    active={currentTab}
                    onChange={handleChangeTab}
                />
            ))}
        </div>
    );
};

export default Tab;
