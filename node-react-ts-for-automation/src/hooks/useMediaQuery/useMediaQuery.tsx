

import React, { useEffect, useState } from 'react'
import useEventListenerTwo from '../useEventListener/useEventListenerTwo';



export default function useMediaQuery(mediaQuery: string) {
    const [isMatch, setIsMatch] = useState(false);
    const [mediaQueryList, setMediaQueryList] = useState(null);
    const [windowSize, setWindowSize] = useState({});

    useEffect(() => {
        const list = window.matchMedia(mediaQuery);
        setMediaQueryList(list);
        setIsMatch(list.matches);
        setWindowSize(getWindowSize())
    }, [mediaQuery]);

    useEventListenerTwo("change", (e: MediaQueryListEvent) => setIsMatch(e.matches), mediaQueryList);
    useEventListenerTwo("resize", () => setWindowSize(getWindowSize()));

    const getWindowSize = () => {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    return { isMatch, windowSize }
}