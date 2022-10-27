export const validateImage = (image) => {
    if (image.match(/\.(jpg|jpeg|png|gif)$/)) return true;
    else return false;
};
