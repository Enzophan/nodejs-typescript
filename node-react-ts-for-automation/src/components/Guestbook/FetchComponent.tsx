
import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch/useFetch';

type Props = {}

const FetchComponent = (props: Props) => {
    const [id, setId] = useState(1);
    const { loading, error, value } = useFetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {}, [id]);


    return (
        <div className='component'>
            <div>{id}</div>
            <div>Loading: {loading.toString()}</div>
            <div>{JSON.stringify(error, null, 2)}</div>
            <div>{JSON.stringify(value, null, 2)}</div>
            <div className='group-btn'>
                <button
                    className='pri-btn btn'
                    onClick={() => setId(currentId => currentId + 1)}
                >
                    {loading ? "Fetching..." : "Increment ID"}
                </button>
            </div>
        </div>
    )
}

export default FetchComponent