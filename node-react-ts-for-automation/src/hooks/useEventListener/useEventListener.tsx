import React, { useEffect, useRef } from 'react';

interface Options {
    enable?: boolean;
    target?: GlobalEventHandlers;
}

export default function useEventListener(
    targetEvent: keyof GlobalEventHandlersEventMap,
    callback: (e: Event) => void,
    { enable = true, target = typeof window !== "undefined" ? document : undefined }: Options = {}
) {
    const callbackRef = useRef(callback);
    const handler = (e: Event) => callbackRef.current(e);

    useEffect(() => {
        callbackRef.current = callback
    }, [callback]);

    useEffect(() => {
        if (!enable) {
            console.log('enable in');
            return;
        };
        target.addEventListener(targetEvent, handler);
        return () => target.removeEventListener(targetEvent, handler);
    }, [targetEvent, enable, target])
}