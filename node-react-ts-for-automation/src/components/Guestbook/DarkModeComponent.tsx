
import useDarkMode from '../../hooks/useDarkMode/useDarkMode'


const DarkModeComponent = () => {
    if (typeof window == "undefined") return;
    const [darkMode, setDarkMode] = useDarkMode();

    return (
        <div className="component">
            <button
                className="pri-btn btn"
                onClick={() => setDarkMode(prevMode => !prevMode)}
            >
                Toggle {darkMode ? "Light" : "Dark"} Mode
            </button>
        </div>
    )
}

export default DarkModeComponent