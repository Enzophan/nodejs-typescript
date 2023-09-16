import { useState } from "react"

export default function useToggle(defaultValue: any) {
    const [value, setValue] = useState<any>(defaultValue);

    function toggleValue(value) {
        setValue(currentValue => typeof value === "boolean" ? value : !currentValue)
    }

    return [value, toggleValue]
}

