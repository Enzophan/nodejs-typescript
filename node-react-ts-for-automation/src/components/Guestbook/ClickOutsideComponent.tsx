import { useState, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';


const ClickOutsideComponent = () => {
    const [open, setOpen] = useState<boolean>(false);
    const modalRef = useRef(null);

    const handleClickOutside = (e: Event) => {
        console.log("handleClickOutside ")
        setOpen(false)
    };

    const handleClickInside = () => {
        console.log("handleClickInside ")
    };

    useClickOutside(modalRef, handleClickOutside);

    const handleOpenBtn = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    return (
        <div className="component">
            <button className={`btn ${open ? "disabled-btn" : "pri-btn"}`} onClick={handleOpenBtn} disabled={open}>Open Modal</button>
            <div
                ref={modalRef}
                onClick={handleClickInside}
                style={{
                    display: open ? "block" : "none",
                    backgroundColor: "blue",
                    color: "white",
                    width: "100px",
                    height: "100px",
                    position: "absolute",
                    top: "calc(50% - 50px)",
                    left: "calc(50% - 50px)",
                }}
            >
                <span>Modal</span>
            </div>
        </div>
    )
}

export default ClickOutsideComponent