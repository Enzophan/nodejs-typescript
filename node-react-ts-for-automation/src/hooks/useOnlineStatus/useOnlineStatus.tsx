
import { useState } from 'react'
import useEventListenerThree from '../useEventListener/useEventListenerThree';


export default function useOnlineStatus() {
    if (typeof window == "undefined") return;

    const [online, setOnline] = useState(navigator.onLine);

    useEventListenerThree('online', () => setOnline(navigator.onLine))
    useEventListenerThree('offline', () => setOnline(navigator.onLine))

    return online
}