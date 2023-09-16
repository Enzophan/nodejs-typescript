import { useState } from 'react'
import { generateName } from '../../helper/util/common';
import useStateWithHistory from '../../hooks/useStateWithHistory/useStateWithHistory';


const StateWithHistoryComponent = () => {
    const [name, setName] = useState("May");
    const [count, setCount, { history, pointer, back, forward, go }] = useStateWithHistory(1);

    return (
        <div className="component">
            <div>Number: {count}</div>
            <div>History: {history.join(", ")}</div>
            <div>Index: {pointer}</div>
            <div>{name}</div>
            <div className="group-btn">
                <button
                    className="pri-btn btn"
                    onClick={() => setCount(currentCount => currentCount * currentCount)}
                >
                    Exponentiation
                </button>
                <button
                    className="pri-btn btn"
                    onClick={() => setCount(currentCount => currentCount * 2)}
                >
                    Double
                </button>
                <button
                    className="pri-btn btn"
                    onClick={() => setCount(currentCount => currentCount + 1)}
                >
                    Increment
                </button>
                <button
                    className="pri-btn btn"
                    onClick={back}
                >
                    Back
                </button>
                <button
                    className="pri-btn btn"
                    onClick={forward}
                >
                    Forward
                </button>
                <button
                    className="pri-btn btn"
                    onClick={() => go(2)}
                >
                    Go To Index 2
                </button>
                <button
                    className="second-btn btn"
                    onClick={() => setName(generateName())}
                >
                    Change Name
                </button>
            </div>
        </div>
    )
}

export default StateWithHistoryComponent