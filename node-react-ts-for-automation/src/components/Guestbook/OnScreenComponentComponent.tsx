import React, { useRef } from 'react'
import useOnScreen from '../../hooks/useOnScreen/useOnScreen';



const OnScreenComponentComponent = () => {
    const headerTwoRef = useRef();
    const visible = useOnScreen(headerTwoRef, "-100px");

    return (
        <div className="component">
            <h3>Header</h3>
            <div className='height-500'>
                ...
            </div>
            <h3 ref={headerTwoRef}>Header 2 {visible && "(Visible)"}</h3>
            <div className='height-500'>
                ...
            </div>
        </div>
    )
}

export default OnScreenComponentComponent