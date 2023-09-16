
import React from 'react'
import useToggle from '../../hooks/useToggle/useToggle'


const ToggleComponent = () => {
    const [boolean, toggleValue] = useToggle(false);

    return (
        <div className="component">
            <div>{boolean.toString()}</div>
            <div className="group-btn">
                <button className='btn' onClick={toggleValue}>Toggle</button>
                <button className='btn' onClick={() => toggleValue(true)}>Make True</button>
                <button className='btn' onClick={() => toggleValue(false)}>Make False</button>
            </div>
        </div>
    )
}

export default ToggleComponent