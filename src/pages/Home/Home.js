import { useMemo } from "react";

import { Helmet } from "react-helmet-async";
import InfiniteScroll from "react-infinite-scroll-component";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Box from "../../components/Box/Box";
import Slider from "react-slick";
import Avatar from "../../components/Avatar/Avatar";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    NextPrevious,
    PrevPrevious,
} from "../../components/ArrowButton/ArrowButton";
import Post, { Loading as PostLoading } from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";

import { useGetPostsFollowing } from "../../queries/post";

const cx = classNames.bind(styles);

const settings = {
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextPrevious right="24px" top="34px" />,
    prevArrow: <PrevPrevious left="3px" top="34px" />,
};

// temporary
const STORIES = [
    {
        name: "hhhltvv",
        image: "https://res.cloudinary.com/debkio0dv/image/upload/v1666774315/instagram-tv/images/278766363_961539401205714_6060398171028786334_n_x9tpt1.jpg",
    },
    {
        name: "sooyaaa__",
        image: "https://res.cloudinary.com/debkio0dv/image/upload/v1666774085/instagram/ji_ghodj7.jpg",
    },
    {
        name: "jennierubyjane",
        image: "https://res.cloudinary.com/debkio0dv/image/upload/v1661796819/instagram/vub3py0axm7rzwg91m6o.jpg",
    },
    {
        name: "lalalalisa_m",
        image: "https://res.cloudinary.com/debkio0dv/image/upload/v1663616047/instagram-tv/images/i636vn1vcc6maCbUXJMXGVxXWwSbMbmS.jpg",
    },
    {
        name: "roses_are_rosie",
        image: "https://res.cloudinary.com/debkio0dv/image/upload/v1666774266/instagram-tv/images/r_df1nt1.jpg",
    },
    {
        name: "momo",
        image: "https://res.cloudinary.com/debkio0dv/image/upload/v1666774520/instagram-tv/images/m_cndefv.jpg",
    },
    {
        name: "mina_sr_my",
        image: "https://res.cloudinary.com/debkio0dv/image/upload/v1666774573/instagram-tv/images/mm_h2853f.jpg",
    },
];

const Home = () => {
    const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
        useGetPostsFollowing({
            currentPage: 1,
        });

    const GetPostsFollowing = useMemo(() => {
        return data?.pages?.reduce((prev, curr) => {
            return prev.concat(curr.data);
        }, []);
    }, [data]);

    return (
        <>
            {isLoading && <Loader />}
            <div id="home">
                <Helmet defaultTitle={`Instagram `}></Helmet>
                <div className={cx("wrapper")}>
                    <div className={cx("container")}>
                        <div className={cx("left")}>
                            {/* Story */}
                            <Box className={cx("story")}>
                                <Slider {...settings}>
                                    {STORIES.map((story, index) => (
                                        <div
                                            key={index}
                                            className={cx("story-item")}
                                        >
                                            <Avatar
                                                avatar={story.image}
                                                className={cx("story-avatar")}
                                                alt={story.name}
                                            />
                                            <p>{story.name}</p>
                                        </div>
                                    ))}
                                </Slider>
                            </Box>
                            {/* Skeleton */}
                            {isFetching && <PostLoading />}
                            {/* Get all Posts */}
                            {GetPostsFollowing && (
                                <InfiniteScroll
                                    dataLength={GetPostsFollowing?.length || 0}
                                    hasMore={hasNextPage}
                                    next={fetchNextPage}
                                    loader={<Loader />}
                                >
                                    {GetPostsFollowing.map((post) => {
                                        return (
                                            <Post key={post._id} data={post} />
                                        );
                                    })}
                                </InfiniteScroll>
                            )}
                        </div>
                        {/* suggest accounts */}
                        <div className={cx("right")}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
