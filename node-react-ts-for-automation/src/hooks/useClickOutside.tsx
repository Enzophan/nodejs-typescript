import { RefObject } from 'react';
import useEventListenerTwo from './useEventListener/useEventListenerTwo';

type Callback = (event: Event) => void

export default function useClickOutside(ref: RefObject<HTMLElement> | undefined | null, callback: Callback) {

    useEventListenerTwo("mousedown",
        e => {
            const el = ref?.current
            // console.log("useClickOutside 1: ", !el)
            // console.log("useClickOutside 2: ", el.contains(e.target as Node))
            if (el == null || el.contains(e.target as Node)) {
                return null
            };
            callback(e)
        });
}

