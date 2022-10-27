import { useState, forwardRef } from "react";
import classNames from "classnames";
import styles from "./Image.module.scss";
import images from "../../assets/images";

const Image = forwardRef(
    (
        {
            src,
            alt,
            classname,
            fallback: customFallback = images.login.child1,
            ...props
        },
        ref
    ) => {
        const [fallback, setFallback] = useState("");
        const handleError = () => {
            setFallback(customFallback);
        };
        return (
            <img
                className={classNames(styles.wrapper, classname)}
                ref={ref}
                src={fallback || src}
                alt={alt}
                {...props}
                onError={handleError}
            />
        );
    }
);

export default Image;
