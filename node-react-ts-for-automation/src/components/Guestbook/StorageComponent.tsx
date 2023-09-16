import { generateName, generateRandomNumber } from '../../helper/util/common';
import { useLocalStorage, useSessionStorage } from '../../hooks/useStorage/useStorage'



const StorageComponent = () => {
    if (typeof window === "undefined") return;

    const [name, setName, removeName] = useSessionStorage("name", "Mint");
    const [age, setAge, removeAge] = useLocalStorage("age", "8");

    return (
        <div className="component">
            <div>
                {name} - {age}
            </div>
            <div className="group-btn">
                <button className="pri-btn btn" onClick={() => setName(generateName())}>Set Name</button>
                <button className="pri-btn btn" onClick={() => setAge(generateRandomNumber())}>Set Age</button>
                <button className="danger-btn btn" onClick={removeName}>Remove Name</button>
                <button className="danger-btn btn" onClick={removeAge}>Remove Age</button>
            </div>
        </div>
    )
}

export default StorageComponent