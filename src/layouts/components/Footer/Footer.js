import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);
const FOOTER_LIST = [
    { title: "Meta" },
    { title: "About" },
    { title: "Blog" },
    { title: "Jobs" },
    { title: "Help" },
    { title: "API" },
    { title: "Privacy" },
    { title: "Terms" },
    { title: "Top Accounts" },
    { title: "Hashtags" },
    { title: "Locations" },
    { title: "Instagram Lite" },
    { title: "Contact Uploading & Non-Users" },
    { title: "Dance" },
    { title: "Food & Drink" },
    { title: "Home & Garden" },
    { title: "Music" },
    { title: "Visual Arts" },
];
const Footer = () => {
    return (
        <footer className={cx("wrapper")}>
            <ul className={cx("list")}>
                {FOOTER_LIST.map((item, index) => (
                    <li className={cx("item")} key={index}>
                        {item.title}
                    </li>
                ))}
            </ul>
        </footer>
    );
};

export default Footer;
