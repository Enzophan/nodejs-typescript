import useRenderCount from '../../hooks/useRenderCount/useRenderCount';
import useToggle from '../../hooks/useToggle/useToggle'

const RenderCountComponent = () => {
    const [boolean, toggle] = useToggle(false);
    const renderCount = useRenderCount();

    return (
        <div className="component">
            <div>{boolean.toString()}</div>
            <div>{renderCount}</div>
            <button className="btn" onClick={toggle}>Toggle</button>
        </div>
    )
}

export default RenderCountComponent