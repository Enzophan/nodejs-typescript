
import React from 'react'
import useGeolocation from '../../hooks/useGeolocation/useGeolocation'


const GeolocationComponent = () => {
    const { loading, error, data } = useGeolocation({})

    return (
        <div className="component">
            <div>Loading: {loading.toString()}</div>
            <div>Error: {error?.message}</div>
            <div>
                {data && data.latitude && data.longitude ? `${data.latitude} x ${data.longitude}` : null}
            </div>
        </div>
    )
}

export default GeolocationComponent