import Button from "../../components/Button/Button";
import { ReactComponent as NewPostIcon } from "../../assets/icons/newPost.svg";
import { ReactComponent as ErrorIcon } from "../../assets/icons/error-media.svg";

const PopupCreatePost = ({ isValid, onOpenFile, fileName }) => {
    return (
        <>
            {isValid ? <NewPostIcon /> : <ErrorIcon />}
            <p style={{ padding: "15px 0", textAlign: "center" }}>
                {isValid
                    ? "Drag photos and videos here"
                    : `This file is not supported ${fileName} could not be uploaded.`}
            </p>
            <Button primary onClick={onOpenFile}>
                {isValid ? "Select from computer" : "Select others files"}
            </Button>
        </>
    );
};

export default PopupCreatePost;
