import { useState } from 'react'
import useDebounce from '../../hooks/useDebounce/useDebounce';


const DebounceComponent = () => {
    const [count, setCount] = useState<number>(10);
    const [inputSearch, setInputSearch] = useState<string>("");

    const onChangeInput = (value) => {
        setInputSearch(value);
    };

    const hanldSearch = () => {
        console.log("Call API...", { search: inputSearch })
    };

    useDebounce(hanldSearch, 2000, [inputSearch]);
    useDebounce(() => alert(count), 1000, [count]);

    return (
        <div className="component">
            <div>{count}</div>
            <button
                className="pri-btn btn"
                onClick={() => setCount(c => c + 1)}
            >
                Increment
            </button>
            <input
                type="text"
                value={inputSearch}
                onChange={(e) => onChangeInput(e.target.value)}
                placeholder="Enter to search"
            />
        </div>
    )
}

export default DebounceComponent