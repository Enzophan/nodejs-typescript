import useStateWithValidation from '../../hooks/useStateWithValidation/useStateWithValidation'


const StateWithValidationComponent = () => {
    const [username, setUsername, isValid] = useStateWithValidation((text: string) => text.length > 6, "");

    return (
        <div className="component">
            <div>
                Valid: <span className={`${isValid ? "valid" : "invalid"}`}>{isValid.toString()}</span>
            </div>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
    )
}

export default StateWithValidationComponent