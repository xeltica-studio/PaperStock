import { PATH_API, PATH_SYSTEM } from "@/const";

export const isValidPath = (path: string) => /^[a-z0-9\-\/]*$/.test(path) && !path.includes('//') && !path.startsWith('/') && !path.endsWith('/');

export const isSystemPath = (path: string) => isValidPath(path) && [PATH_SYSTEM, PATH_API].includes(path.split('/')[0]);
