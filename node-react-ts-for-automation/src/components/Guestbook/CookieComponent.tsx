import { generateName } from '../../helper/util/common';
import useCookie from '../../hooks/useCookie/useCookie';


const CookieComponent = () => {
    const [value, update, remove] = useCookie("name", "")

    const handleUpdateCookie = () => {
        update(generateName());
    }

    return (
        <div className="component">
            <div className='title'>
                <h4> Name: <span style={{ color: "#f54343" }}>{value}</span></h4>
            </div>
            <div className='group-btn'>
                <button className="pri-btn btn" onClick={handleUpdateCookie}>Change Name</button>
                <button className="danger-btn btn" onClick={remove}>Delete Name</button>
            </div>
        </div>
    )
}

export default CookieComponent