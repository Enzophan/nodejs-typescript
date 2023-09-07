import { useCallback, useEffect, useState } from "react";

export function useLocalStorage(
  key: string,
  defaultValue = null
) {
  return useStorage(
    key,
    defaultValue,
    typeof window !== "undefined"
      ? window.localStorage
      : undefined
  );
}

export function useSessionStorage(
  key: string,
  defaultValue = null
) {
  return useStorage(
    key,
    defaultValue,
    typeof window !== "undefined"
      ? window.sessionStorage
      : undefined
  );
}

function useStorage(
  key: string,
  defaultValue: any,
  storageObject: any
) {
  if (typeof window === "undefined") return;

  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);

    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) {
      return storageObject.removeItem(key);
    }

    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}
