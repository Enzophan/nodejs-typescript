import React from 'react'

type Props = {
    title: string,
    subTitle?: string,
    onClickClose?: () => void,
    children?: React.ReactNode
}

const Modal = ({ title, subTitle, onClickClose, children }: Props) => {
    const handleClickCloseBtn = (e) => {
        e.preventDefault();
        onClickClose();
    }

    return (
        <div className="modal">
            <div className="modal-title">
                <div className="group-title">
                    <div className="title">{title}</div>
                    <div className="sub-title">{subTitle}</div>
                </div>
                <span className="close" onClick={handleClickCloseBtn}>&times;</span>
            </div>
            <div className="modal-content">
                {children}
            </div>
            <div className="modal-footer">
                <span> (<span className="icon-required">*</span>) Required input</span>
            </div>
        </div>
    )
}

export default Modal