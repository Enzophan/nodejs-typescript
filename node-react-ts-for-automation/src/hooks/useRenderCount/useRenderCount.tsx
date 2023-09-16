import { useEffect, useRef } from 'react'


export default function useRenderCount() {
    const count = useRef<number>(1);
    useEffect(() => {
        count.current++
    })
    return count.current
}