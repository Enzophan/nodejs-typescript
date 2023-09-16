import React from 'react'
import useOnlineStatus from '../../hooks/useOnlineStatus/useOnlineStatus'

const OnlineStatusComponent = () => {
    const online = useOnlineStatus();
    return (
        <div className='component'>
            <h4>Status:
                <span style={{ color: `${online ? "#04aa6d" : "#5a5454"}` }}>{online ? "Online" : "Offline"}</span>
            </h4>
        </div>
    )
}

export default OnlineStatusComponent