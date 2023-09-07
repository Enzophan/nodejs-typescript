import React from 'react';
import { SuccessIcon, FailureIcon, WarningIcon, CloseIcon } from "./Icons"

type ToastProps = {
    message: string,
    type: string,
    onClose: () => void
}

const Toast = ({ message, type, onClose }: ToastProps) => {

    const iconMap = {
        success: <SuccessIcon />,
        failure: <FailureIcon />,
        warning: <WarningIcon />
    };

    const toastIcon = iconMap[type] || null;

    return (
        <div className={`toast toast--${type}`} role={"alert"}>
            <div className="toast-message">
                {toastIcon && (
                    <div className="icon icon-md icon-thumb">
                        {toastIcon}
                    </div>
                )}
                <p>{message}</p>
            </div>
            <button className="toast-close-btn" onClick={onClose}>
                <span className="icon">
                    <CloseIcon />
                </span>
            </button>
        </div>
    )
}

export default Toast