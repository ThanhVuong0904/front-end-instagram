import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { ErrorMessage } from "formik";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";

const cx = classNames.bind(styles);
export default function InputField({
    field,
    form,
    type,
    label,
    placehoder,
    disabled,
    subLabel,
    isRequire,
}) {
    const { name, value, onChange, onBlur } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    return (
        <FormGroup className={cx("form-group")}>
            {label && (
                <Label for={name} className={cx("label")}>
                    {label} {isRequire && <span className={cx("tag")}>*</span>}
                </Label>
            )}
            {subLabel && <span className={cx("sub-label")}>{subLabel}</span>}
            <Input
                id={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={cx("form-control")}
                placeholder={placehoder}
                disabled={disabled}
                invalid={showError}
            />
            {/* {showError && <p className={cx('form-feedback')}>{errors[name]}</p>} */}
            <ErrorMessage
                className={cx("form-feedback")}
                name={name}
                component={FormFeedback}
            />
        </FormGroup>
    );
}
