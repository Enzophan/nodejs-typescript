import useScript from '../../hooks/useScript/useScript'

const ScriptComponent = () => {
    const { loading, error } = useScript("https://code.jquery.com/jquery-3.6.0.min.js");

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
        <div className="component">{window.innerWidth}</div>
    )
}

export default ScriptComponent