
import React, { HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react'
import useDeepCompareEffect from '../../hooks/useDeepCompareEffect/useDeepCompareEffect';

type Props = {}

const DeepCompareEffectComponent = (props: Props) => {
    const [age, setAge] = useState(0);
    const [otherCount, setOtherCount] = useState(0);
    const useEffectCountRef = useRef<HTMLSpanElement>(null);
    const useDeepCompareEffectCountRef = useRef<HTMLSpanElement>(null);
    const person = { age, name: "Selena" };

    useEffect(() => {
        useEffectCountRef.current.textContent = `${parseInt(useEffectCountRef.current.textContent) + 1}`;
    }, [person]);

    useDeepCompareEffect(() => {
        useDeepCompareEffectCountRef.current.textContent = `${parseInt(useDeepCompareEffectCountRef.current.textContent) + 1}`
    }, [person]);


    return (
        <div className="component">
            <div>
                useEffect: <span ref={useEffectCountRef}>0</span>
            </div>
            <div>
                useDeepCompareEffect: <span ref={useDeepCompareEffectCountRef}>0</span>
            </div>

            <div>Other Count: {otherCount}</div>
            <div>{JSON.stringify(person)}</div>
            <button
                className="btn"
                onClick={() => setAge(currentAge => currentAge + 1)}
            >
                Increment Age
            </button>
            <button
                className="btn"
                onClick={() => setOtherCount(count => count + 1)}
            >
                Increment Other Count
            </button>
        </div>
    )
}

export default DeepCompareEffectComponent