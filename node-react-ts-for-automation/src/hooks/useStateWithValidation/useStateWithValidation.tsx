import { useCallback, useState } from 'react';


const useStateWithValidation = (validationFunc, initialValue) => {
    const [state, setState] = useState<any>(initialValue);
    const [isValid, setIsValid] = useState(() => validationFunc(state));
    const onChange = useCallback((nextState) => {
        console.log("nextState ", nextState)
        const value = typeof nextState === "function" ? nextState(state) : nextState;
        setState(value);
        setIsValid(validationFunc(value));
    }, [validationFunc]);

    return [state, onChange, isValid]
}

export default useStateWithValidation