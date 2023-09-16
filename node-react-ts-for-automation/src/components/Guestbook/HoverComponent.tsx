import { useEffect, useRef, useState } from 'react';
import useHover from '../../hooks/useHover/useHover';


const HoverComponent = () => {
    const [count, setCount] = useState<number>(0);
    const elementRef = useRef();
    const hovered = useHover(elementRef);

    useEffect(() => {
        if (hovered) setCount(prev => prev + 1)
    }, [hovered]);

    return (
        <div
            className="component"
        >
            <h4>Hover: {count}</h4>

            <div className='group-btn'>
                <span
                    ref={elementRef}
                    style={{
                        backgroundColor: hovered ? "#04aa6d" : "#5a5454",
                        color: hovered ? "#5a5454" : "#f1f1f1",
                        width: "200px",
                        height: "100px",
                        position: "relative",
                        top: "calc(50% - 50px)",
                        left: "calc(50% - 50px)",
                        padding: "10px",
                    }}
                >
                    Hover
                </span>
            </div>
        </div>
    )
}

export default HoverComponent