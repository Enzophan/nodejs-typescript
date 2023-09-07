import { useState, useEffect, useRef } from 'react';
import useArray from '../../hooks/useArray';
import useAsync from '../../hooks/useAsync';
import useEventListener from '../../hooks/useEventListener/useEventListener';
import ClickOutsideComponent from './ClickOutsideComponent';
import CookieComponent from './CookieComponent';
import CopyToClipboardComponent from './CopyToClipboardComponent';
import DarkModeComponent from './DarkModeComponent';
import DebounceComponent from './DebounceComponent';
import DebugInformationComponent from './DebugInformationComponent';
import DeepCompareEffectComponent from './DeepCompareEffectComponent';
import FetchComponent from './FetchComponent';
import GeolocationComponent from './GeolocationComponent';
import HoverComponent from './HoverComponent';
import LongPressComponent from './LongPressComponent';
import MediaQueryComponent from './MediaQueryComponent';
import OnlineStatusComponent from './OnlineStatusComponent';
import OnScreenComponentComponent from './OnScreenComponentComponent';
import PreviousComponent from './PreviousComponent';
import RenderCountComponent from './RenderCountComponent';
import ScriptComponent from './ScriptComponent';
import StateWithHistoryComponent from './StateWithHistoryComponent';
import StateWithValidationComponent from './StateWithValidationComponent';
import StorageComponent from './StorageComponent';
import TimeoutComponent from './TimeoutComponent';
import ToggleComponent from './ToggleComponent';

const GuestbookPage = () => {
    const [enable, setEnable] = useState(false);
    const [count, setCount] = useState(0);
    const { array, set, push, filter, update, remove, clear, sort } = useArray([]);
    const { loading, error, value } = useAsync(() => {
        return new Promise((resolve, reject) => {
            const success = false;
            setTimeout(() => { success ? resolve("Hi ") : reject("Error") }, 2000)
        })
    });

    useEffect(() => {
        console.log("Render App")
        set(randomNumbers(5))
        // const intervalId = setInterval(() => {
        //     // setCount(count + 1)
        //     console.log("Count: ", { count })
        // }, 1000)
        // return () => {
        //     clearInterval(intervalId)
        // }
    }, [count]);

    useEventListener('click', () => {
        console.log("object", count)
    }, { enable });

    useEventListener(
        'scroll',
        () => {
            console.log('SCROLLLLL');
        },
        { target: typeof window !== "undefined" ? window : undefined }
    );

    const randomNumbers = (n = 1) => {
        let listNumbers = []
        for (let i = 0; i < n; i++) {
            listNumbers.push(Math.floor(Math.random() * 100) + 1)
        }
        return listNumbers;
    }

    return (
        <div className="container">
            <h1>Hello QAs!</h1>
            <span>Just only for testing</span>
            <div className="subContainer">
                <h1>Custom Hooks</h1>
                <div className="hook-container">
                    <h3>useArray:  {array.join(", ")}</h3>
                    <div className='component'>
                        <div className="group-btn">
                            <button className="pri-btn btn" onClick={() => push(Math.floor(Math.random() * 100) + 1)}>Add Random Number</button>
                            <button className="pri-btn btn" onClick={() => update(1, 9)}>Change Second Element To 9</button>
                            <button className="pri-btn btn" onClick={() => remove(1)}>Remove Second Element</button>
                            <button className="pri-btn btn" onClick={() => filter(n => n <= 9)}>
                                Keep Numbers Less Than 10
                            </button>
                            <button className="pri-btn btn" onClick={() => set([1, 2])}>Set To 1, 2</button>
                            <button className="pri-btn btn" onClick={() => sort((a, b) => a - b)}>Sort</button>
                            <button className="second-btn btn" onClick={clear}>Clear</button>
                        </div>
                    </div>
                </div>
                <div className="hook-container">
                    <h3>useAsync</h3>
                    <div className='component'>
                        <div>Loading: {loading.toString()}</div>
                        <div>{error}</div>
                        <div>{value}</div>
                    </div>
                </div>

                <div className="hook-container">
                    <h3>useEventListener</h3>
                    <div className="group-btn" style={{ height: enable ? "2000px" : "auto" }}>
                        <button className="pri-btn btn" onClick={() => setEnable(!enable)}>Enable: {enable.toString()}</button>
                        <button className="pri-btn btn" onClick={() => setCount(count + 1)}>click</button>
                    </div>
                </div>

                <div className="hook-container">
                    <h3>useClickOutside</h3>
                    <ClickOutsideComponent />
                </div>
                <div className="hook-container">
                    <h3>useCopyToClipboard</h3>
                    <CopyToClipboardComponent />
                </div>
                <div className="hook-container">
                    <h3>useDarkMode</h3>
                    <DarkModeComponent />
                </div>
                <div className="hook-container">
                    <h3>useDebounce</h3>
                    <DebounceComponent />
                </div>
                <div className="hook-container">
                    <h3>useDebugInformation</h3>
                    <DebugInformationComponent />
                </div>
                <div className="hook-container">
                    <h3>useDeepCompareEffect</h3>
                    <DeepCompareEffectComponent />
                </div>
                <div className="hook-container">
                    <h3>useFetch</h3>
                    <FetchComponent />
                </div>
                <div className="hook-container">
                    <h3>useGeolocation</h3>
                    <GeolocationComponent />
                </div>
                <div className="hook-container">
                    <h3>useHover</h3>
                    <HoverComponent />
                </div>
                <div className="hook-container">
                    <h3>useLongPress</h3>
                    <LongPressComponent />
                </div>
                <div className="hook-container">
                    <h3>useMediaQuery</h3>
                    <MediaQueryComponent />
                </div>
                <div className="hook-container">
                    <h3>useOnlineStatus</h3>
                    <OnlineStatusComponent />
                </div>
                <div className="hook-container">
                    <h3>useOnScreen</h3>
                    <OnScreenComponentComponent />
                </div>
                <div className="hook-container">
                    <h3>usePrevious</h3>
                    <PreviousComponent />
                </div>
                <div className="hook-container">
                    <h3>useRenderCount</h3>
                    <RenderCountComponent />
                </div>
                <div className="hook-container">
                    <h3>useToggle</h3>
                    <ToggleComponent />
                </div>
                <div className="hook-container">
                    <h3>useScript</h3>
                    <ScriptComponent />
                </div>
                <div className="hook-container">
                    <h3>useStateWithHistory</h3>
                    <StateWithHistoryComponent />
                </div>
                <div className="hook-container">
                    <h3>useStateWithValidation</h3>
                    <StateWithValidationComponent />
                </div>
                <div className="hook-container">
                    <h3>useCookie</h3>
                    <CookieComponent />
                </div>
                <div className="hook-container">
                    <h3>useLocalStorage &amp; useSessionStorage</h3>
                    <StorageComponent />
                </div>
                <div className="hook-container">
                    <h3>useTimeout</h3>
                    <TimeoutComponent />
                </div>
            </div>
            {/* <h3>Random number: <span>{Math.floor(Math.random() * 100) + 1}</span></h3> */}
            <button className="pri-btn btn" onClick={() => setCount(count + 1)}>Click to {count}</button>
        </div>
    )
}

export default GuestbookPage