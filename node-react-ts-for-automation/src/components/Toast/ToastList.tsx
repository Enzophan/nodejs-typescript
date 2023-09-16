import { RefObject, useEffect, useRef } from 'react';
import { IToast } from '../app';
import Toast from './Toast';

type ToastListProps = {
    data: IToast[],
    position: string,
    removeToast: (id: string) => void
}

const ToastList = ({ data, position = "top-right", removeToast }: ToastListProps) => {
    const listRef = useRef<HTMLDivElement | null>(null);

    const handleScrolling = (el) => {
        const isTopPosition = ["top-left", "top-right"].includes(position);
        if (isTopPosition) {
            el?.scrollTo(0, el.scrollHeight)
        } else {
            el?.scrollTo(0, 0)
        }
    }

    useEffect(() => {
        handleScrolling(listRef.current)
    }, [position, data])

    return (
        data.length > 0 && (
            <div
                className={`toast-list toast-list--${position}`}
                aria-live="assertive"
            >
                {data.map((toast) => {
                    return (
                        <Toast
                            key={toast.id}
                            message={toast.message}
                            type={toast.type}
                            onClose={() => removeToast(toast.id)}
                        />
                    )
                })}
            </div>
        )
    )
}

export default ToastList