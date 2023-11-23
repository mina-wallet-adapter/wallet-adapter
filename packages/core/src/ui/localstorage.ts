const LOCALSTORAGE_KEY = "MinaLastConnectedWallet";

export function getLocalStorage<T>(defaultValue: T | null = null): T | null {
  try {
    const value = localStorage.getItem(LOCALSTORAGE_KEY);
    if (value) return JSON.parse(value) as T;
  } catch (error) {
    console.error(error);
  }

  return defaultValue;
}

export function setLocalStorage<T>(value: T | null = null): void {
  try {
    if (value === null) {
      localStorage.removeItem(LOCALSTORAGE_KEY);
    } else {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(value));
    }
  } catch (error) {
    console.error(error);
  }
}
