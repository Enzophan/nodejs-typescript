import { useCallback, useEffect, useRef, useState } from 'react';
import copy from "copy-to-clipboard";

// export default function useCopyToClipboard(str: string): [boolean, () => void, (value: boolean) => void] {
//     const copyableString = useRef(str);
//     const [success, setSuccess] = useState<boolean>(false);

//     useEffect(() => {
//         copyableString.current = str
//     }, [str]);

//     const copyAction = useCallback(() => {
//         const copiedString = copy(copyableString.current);
//         setSuccess(copiedString);
//     }, [copyableString]);

//     return [success, copyAction, setSuccess]
// }

export default function useCopyToClipboard(): [boolean, (str: string) => void, (value: boolean) => void] {
    const [text, setText] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);



    const copyAction = useCallback((str: string) => {
        const copiedString = copy(str);
        if (copiedString) setText(str);
        setSuccess(copiedString);
    }, [text]);

    return [success, copyAction, setSuccess]
}

