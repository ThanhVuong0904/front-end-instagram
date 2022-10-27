import moment from "moment/moment";

const timeMomentFormat = (time) => {
    moment(time).fromNow();
};

export default timeMomentFormat;
