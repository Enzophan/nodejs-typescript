import useEffectOnce from '../useEffectOnce';
import useEventListenerTwo from '../useEventListener/useEventListenerTwo';
import useTimeout from '../useTimeout/useTimeout'

type Callback = () => void

export default function useLongPress(ref: React.RefObject<any>, callback: Callback, { delay = 250 }) {
    const { reset, clear } = useTimeout(callback, delay);
    useEffectOnce(clear);
    useEventListenerTwo("mousedown", reset, ref.current)
    useEventListenerTwo("touchstart", reset, ref.current)
    useEventListenerTwo("mouseup", clear, ref.current)
    useEventListenerTwo("mouseleave", clear, ref.current)
    useEventListenerTwo("touchend", clear, ref.current)
}