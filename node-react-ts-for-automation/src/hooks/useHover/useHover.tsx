import React, { useState } from 'react'
import useEventListenerTwo from '../useEventListener/useEventListenerTwo';


export default function useHover(ref: React.RefObject<any>) {
    const [hovered, setHovered] = useState(false);
    useEventListenerTwo("mouseover", () => setHovered(true), ref.current)
    useEventListenerTwo("mouseout", () => setHovered(false), ref.current)
    return hovered
}