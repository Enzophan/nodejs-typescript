import { useState } from 'react';
import useCopyToClipboard from '../../hooks/useCopyToClipboard'


const CopyToClipboardComponent = () => {
    const [string, setString] = useState<string>("enzophan.github.io")
    const [copied, copy, setCopied] = useCopyToClipboard();

    const onChangeInput = (value) => {
        setString(value);
    }

    const copyText = () => {
        copy(string);
        setTimeout(() => {
            setCopied(false);
            setString("");
        }, 3000);
    };

    return (
        <div className="component">
            <div className="group-btn">
                <input type="text" value={string} onChange={(e) => onChangeInput(e.target.value)} placeholder="Enter text to copy" />
                <button className="pri-btn btn" onClick={copyText}>
                    {copied ? "Copied" : "Copy Text"}
                </button>
            </div>
        </div>
    )
}

export default CopyToClipboardComponent