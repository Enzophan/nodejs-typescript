import React, { useEffect, useRef } from 'react';


export default function useEventListenerTwo(
    eventType: keyof GlobalEventHandlersEventMap,
    callback: (e: Event) => void,
    element = typeof window !== "undefined" ? window : undefined
) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback
    }, [callback]);

    useEffect(() => {
        if (element == null) return;
        const handler = (e: Event) => callbackRef.current(e);
        element.addEventListener(eventType, handler);
        return () => element.removeEventListener(eventType, handler);
    }, [eventType, element])
}