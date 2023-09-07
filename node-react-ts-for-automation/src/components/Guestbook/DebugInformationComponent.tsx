

import { useState } from 'react'
import useToggle from '../../hooks/useToggle/useToggle';
import ChildComponent from './ChildComponent';


const DebugInformationComponent = () => {
    const [boolean, toggle] = useToggle(false);
    const [count, setCount] = useState<number>(0);

    return (
        <div className='component'>
            <ChildComponent boolean={boolean} count={count} />
            <div className="group-btn">
                <button className='btn' onClick={toggle}>
                    Toggle
                </button>
                <button className='btn' onClick={() => setCount(prev => prev + 1)}>
                    Increment
                </button>
            </div>
        </div>
    )
}

export default DebugInformationComponent