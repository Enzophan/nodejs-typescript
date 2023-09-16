import useMediaQuery from '../../hooks/useMediaQuery/useMediaQuery';


const MediaQueryComponent = () => {
    const { isMatch, windowSize } = useMediaQuery("(min-width: 700px)")

    return (
        <div className="component">
            <div>
                <h4>
                    Large: {isMatch.toString()}
                </h4>
                <span>
                    Resolution: {JSON.stringify(windowSize)}
                </span>
            </div>
        </div>
    )
}

export default MediaQueryComponent