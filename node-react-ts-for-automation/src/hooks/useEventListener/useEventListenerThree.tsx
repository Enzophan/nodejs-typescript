import React, { useEffect, useRef } from 'react';

interface CustomEventMap extends GlobalEventHandlersEventMap {
    "online": CustomEvent<boolean>;
    "offline": CustomEvent<boolean>;
}

export default function useEventListenerThree(
    eventType: keyof CustomEventMap,
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