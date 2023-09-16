import React, { useRef } from 'react'
import useLongPress from '../../hooks/useLongPress/useLongPress';


const LongPressComponent = () => {
    const elementRef = useRef();
    useLongPress(elementRef, () => alert("Long Press"), { delay: 500 })

    return (
        <div className="component">
            <div
                ref={elementRef}
                style={{
                    position: "relative",
                    backgroundColor: "#5a5454",
                    color: "#f1f1f1",
                    width: "100px",
                    height: "100px",
                    top: "calc(50% - 50px)",
                    left: "calc(50% - 50px)",
                    padding: "10px",
                }}
            >
                Long Press
            </div>
        </div>
    )
}

export default LongPressComponent