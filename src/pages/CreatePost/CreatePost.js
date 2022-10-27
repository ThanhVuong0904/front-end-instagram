import { useRef } from "react";
import { Dialog, Avatar } from "@mui/material";
import Slider from "react-slick";
import Box from "../../components/Box/Box";

import { ReactComponent as EmojiIcon } from "../../assets/icons/emoji.svg";
import { ReactComponent as DownChervonIcon } from "../../assets/icons/down-chevron.svg";
import { ReactComponent as AddLocationIcon } from "../../assets/icons/add-location.svg";
import { ReactComponent as BackIcon } from "../../assets/icons/back.svg";
import CreateSuccessIcon from "../../assets/images/success-post.gif";

import classNames from "classnames/bind";
import styles from "./CreatePost.module.scss";

import Button from "../../components/Button/Button";
import { useState } from "react";
import { getUserData } from "../../utils/storage";
import { validateImage } from "../../utils/validateImage";
import {
    NextPrevious,
    PrevPrevious,
} from "../../components/ArrowButton/ArrowButton";
import PopupCreatePost from "../../components/PopupCreatePost/PopupCreatePost";
import { useEffect } from "react";
import { useCreatePost } from "../../mutations/post";
import LoadingCreatePost from "../../assets/images/loading-create-post.gif";
import { useGetPostsOfUser } from "../../queries/post";

const cx = classNames.bind(styles);
const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextPrevious right="10px" />,
    prevArrow: <PrevPrevious left="10px" />,
    dots: true,
    dotsClass: `slick-dots custom-dots dot-white`,
};

const OPTIONS = [
    { title: "", icon: <EmojiIcon /> },
    { title: "Add location", icon: <AddLocationIcon /> },
    { title: "Accessibility", icon: <DownChervonIcon /> },
    { title: "Advanced settings", icon: <DownChervonIcon /> },
];

const CreatePost = ({ isOpen, onClose }) => {
    const userData = getUserData();
    const { mutate, isLoading } = useCreatePost();
    const { refetch } = useGetPostsOfUser({
        currentPage: 1,
        username: userData.username,
    });
    const inputRef = useRef();
    const [step, setStep] = useState(1);
    // step1: select file
    // step2: validate file -- false step 2, true step3
    // step3: loading
    // step4: success
    const [blobLinks, setBlobLinks] = useState([]);
    const [isValidFile, setIsValidFile] = useState(true);
    const [files, setFiles] = useState();
    const [desc, setDesc] = useState("");

    useEffect(() => {
        setBlobLinks([]);
        setIsValidFile(true);
        setFiles();
    }, [isOpen]);

    useEffect(() => {
        isLoading && setStep(3);
    }, [isLoading]);

    const handleOpenFile = () => {
        inputRef.current.click();
    };
    const handleChangeFile = (e) => {
        const vaildFiles = Array.from(e.target.files).map((file) => {
            return {
                valid: validateImage(file.name),
                file: file,
            };
        });
        const fileError = vaildFiles.find((file) => !file.valid);

        if (fileError && !fileError.valid) {
            setIsValidFile(false);

            setFiles(fileError.file);
            return;
        }
        const images = Array.from(e.target.files).map((image) =>
            URL.createObjectURL(image)
        );
        setIsValidFile(true);
        setBlobLinks(images);
        setFiles(e.target.files);
        setStep(2);
    };

    const handleCreatePost = async () => {
        const formData = new FormData();
        formData.append("description", desc);
        Array.from(files).forEach((file) => formData.append("assets", file));
        mutate(formData, {
            onSuccess(data) {
                setStep(4);
                setDesc("");
                refetch();
            },
            onError(error) {
                console.log("ERR", error);
            },
        });
    };

    const handleBack = () => {
        setStep(1);
        setBlobLinks([]);
        setDesc("");
    };

    const handleClose = () => {
        setStep(1);
        onClose();
    };
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            fullWidth={blobLinks && true}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: `${step === 2 ? "722px" : "382px"}`,
                        overflow: "hidden",
                    },
                },
            }}
        >
            <Box className={cx("wrapper")}>
                <div
                    className={cx("modal-header", {
                        blob: step === 2,
                    })}
                >
                    {step === 2 && <BackIcon onClick={handleBack} />}
                    <h1>{step !== 3 ? "Create new post" : "Post shared"}</h1>
                    {step === 2 && (
                        <Button
                            className={cx("btn-share")}
                            onClick={handleCreatePost}
                        >
                            Share
                        </Button>
                    )}
                </div>
                {step === 2 && isValidFile && (
                    <div className={cx("post")}>
                        <Slider {...settings} className={cx("slider")}>
                            {blobLinks.map((blob, index) => {
                                return (
                                    <img
                                        key={index}
                                        className={cx("post-image")}
                                        src={blob}
                                        alt="preview"
                                    />
                                );
                            })}
                        </Slider>

                        <div className={cx("post-content")}>
                            <div className={cx("header")}>
                                <Avatar
                                    sx={{
                                        width: 28,
                                        height: 28,
                                    }}
                                    src={userData.avatar}
                                />
                                <span className={cx("username")}>
                                    {userData.username}
                                </span>
                            </div>
                            <div className="body">
                                <textarea
                                    className={cx("text-area")}
                                    placeholder="Write a caption..."
                                    autoComplete="off"
                                    autoCorrect="off"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                ></textarea>
                                {OPTIONS.map((option, index) => (
                                    <div
                                        key={index}
                                        className={cx("option-item")}
                                    >
                                        {option.title && (
                                            <span>{option.title}</span>
                                        )}
                                        {option.icon}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {step === 1 && (
                    <div className={cx("popup-create-post")}>
                        <PopupCreatePost
                            isValid={isValidFile}
                            onOpenFile={handleOpenFile}
                            fileName={files ? files.name : ""}
                        />
                    </div>
                )}
                {step === 4 && (
                    <div className={cx("popup-create-post")}>
                        <img
                            src={CreateSuccessIcon}
                            alt=""
                            style={{ width: 96, height: 96 }}
                        />
                        <p
                            style={{
                                fontWeight: 300,
                                color: "rgb(38,38,38)",
                                fontSize: 22,
                            }}
                        >
                            Your post has been shared.
                        </p>
                    </div>
                )}
                {isLoading && (
                    <div className={cx("popup-create-post")}>
                        <img
                            src={LoadingCreatePost}
                            alt=""
                            style={{ width: 96, height: 96 }}
                        />
                    </div>
                )}

                <input
                    type="file"
                    hidden
                    ref={inputRef}
                    onChange={handleChangeFile}
                    multiple
                />
            </Box>
        </Dialog>
    );
};

export default CreatePost;
