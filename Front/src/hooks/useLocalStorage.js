import { useState, useEffect } from "react";

function getSavedData(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key));

    if(savedValue) return savedValue;

    return initialValue;
}

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return getSavedData(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}