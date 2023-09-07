import React from 'react'
import useDebugInformation from '../../hooks/useDebugInformation/useDebugInformation'

type Props = {
    boolean: boolean,
    count: number,
}

const ChildComponent = ({ boolean, count }: Props) => {
    const info = useDebugInformation("ChildComponent", { boolean, count });

    return (
        <div>
            <div>boolean: {boolean.toString()}</div>
            <div>count: {count}</div>
            <div>{JSON.stringify(info, null, 2)}</div>
        </div>
    )
}

export default ChildComponent