import { useMemo } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet } from "react-helmet-async";

import classNames from "classnames/bind";
import styles from "./Explore.module.scss";

import Loader from "../../components/Loader/Loader";
import GridExplore from "../../components/GridExplore/GridExplore";

import { useGetPostsForYou } from "../../queries/post";

const cx = classNames.bind(styles);
const Explore = () => {
    const { data, fetchNextPage, hasNextPage, isLoading } = useGetPostsForYou({
        currentPage: 1,
    });
    const GetPostsForyou = useMemo(() => {
        return data?.pages?.reduce((prev, curr) => {
            return prev.concat(curr.data);
        }, []);
    }, [data]);

    return (
        <>
            <Helmet defaultTitle="Instagram" />
            {isLoading && <Loader />}
            <div className={cx("wrapper")}>
                <div id="explore" className={cx("container")}>
                    {GetPostsForyou && (
                        <InfiniteScroll
                            dataLength={GetPostsForyou?.length || 0}
                            next={fetchNextPage}
                            hasMore={hasNextPage}
                            loader={<Loader />}
                        >
                            <GridExplore array={GetPostsForyou} />
                        </InfiniteScroll>
                    )}
                </div>
            </div>
        </>
    );
};

export default Explore;
