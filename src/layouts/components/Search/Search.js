import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { Wrapper as PopperWrapper } from "../../../components/Popper";
import HeadlessTippy from "@tippyjs/react/headless";
import AccountItem from "../../../components/Account/AccountItem";

import SearchIcon from "@mui/icons-material/Search";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import useDebounce from "../../../hooks/useDebounce";
import UserService from "../../../services/user";

const cx = classNames.bind(styles);

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();
    const btnSearchRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await UserService.searchUser(debouncedValue);
            setSearchResult(result.data);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClear = () => {
        setSearchValue("");
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleInputFocus = () => {
        setShowResult(true);
        btnSearchRef.current.style.display = "none";
    };
    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div
                        className={cx("search-result")}
                        tabIndex="-1"
                        {...attrs}
                    >
                        <PopperWrapper className={cx("search-popper")}>
                            <h4 className={cx("search-title")}>Recent</h4>
                            {searchResult.map((result) => (
                                <AccountItem
                                    key={result._id}
                                    username={result.username}
                                    tick={result.tick}
                                    name={result.name}
                                    avatar={result.avatar}
                                />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx("search")}>
                    <button
                        className={cx("search-btn")}
                        onMouseDown={(e) => e.preventDefault()}
                        ref={btnSearchRef}
                    >
                        <SearchIcon />
                    </button>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={handleInputFocus}
                        onBlur={() =>
                            (btnSearchRef.current.style.display = "flex")
                        }
                    />
                    {!!searchValue && !loading && (
                        <button className={cx("clear")} onClick={handleClear}>
                            <CancelRoundedIcon />
                        </button>
                    )}
                    {loading && <RotateRightIcon className={cx("loading")} />}
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default Search;
