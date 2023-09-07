import { useState } from 'react'
import useTimeout from '../../hooks/useTimeout/useTimeout';

const TimeoutComponent = () => {
    const [count, setCount] = useState<number>(0);
    const { reset, clear } = useTimeout(() => setCount(0), 2000);
    return (
        <div className="component">
            <div>{count}</div>
            <div className="group-btn">
                <button className='pri-btn btn' onClick={() => setCount(c => c + 1)}>Increment</button>
                <button className='second-btn btn' onClick={clear}>Clear Timeout</button>
                <button className='danger-btn btn' onClick={reset}>Reset Timeout</button>
            </div>
        </div>
    )
}

export default TimeoutComponent