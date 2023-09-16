import { useEffect } from 'react';

type Callback = () => void

export default function useEffectOnce(callback: Callback) {
    useEffect(callback, [])
}