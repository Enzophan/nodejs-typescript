import { useState } from 'react'
import usePrevious from '../../hooks/usePrevious/usePrevious';
import { generateName } from '../../helper/util/common'


const PreviousComponent = () => {
    const [count, setCount] = useState<number>(0);
    const [name, setName] = useState<string>("Zinzo");
    const previousCount = usePrevious<number>(count);

    const handleChangeName = () => {
        setName(generateName())
    }

    return (
        <div className="component">
            <div>Current: {count} | Previous: {previousCount}</div>
            <div>{name}</div>
            <div className="group-btn">
                <button
                    className="second-btn btn"
                    onClick={() => setCount(prev => prev - 1)}
                >
                    Decrement
                </button>
                <button
                    className="pri-btn btn"
                    onClick={() => setCount(prev => prev + 1)}
                >
                    Increment
                </button>
                <button
                    className="pri-btn btn"
                    onClick={handleChangeName}
                >
                    Change Name
                </button>
            </div>
        </div>
    )
}

export default PreviousComponent