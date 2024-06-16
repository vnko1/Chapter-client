import { StorageKeyValue } from "@/types";

export const setDataToSS = (data: StorageKeyValue) =>
  Object.keys(data).map((name) =>
    sessionStorage.setItem(name, JSON.stringify(data[name]))
  );

export const getDataFromSS = <T>(key: string): T | null => {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeDataFromSS = (...args: string[]) =>
  args.forEach((i) => sessionStorage.removeItem(i));
