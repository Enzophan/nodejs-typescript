

import React, { useEffect } from 'react'
import { useLocalStorage } from '../useStorage/useStorage';

export default function useDarkMode() {
    const [darkMode, setDarkMode] = useLocalStorage("useDarkMode");
    // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    // const enabled = darkMode ?? prefersDarkMode

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode)
    }, [darkMode]);

    return [darkMode, setDarkMode]
}