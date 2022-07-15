import { ApiErrorObject, ApiObject } from "@/models/api/object";

export const get = async <T = any>(endpoint: string, query?: Record<string, unknown>) => {
  const q = !query ? '' : '?' + Object.entries(query).map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&');
  return fetchAndThrow<T>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${endpoint}${q}`, {
    method: 'GET',
  });
};

export const post = async <T = any>(endpoint: string, args: Record<string, unknown> = {}) => {
  return fetchAndThrow<T>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

export const put = async <T = any>(endpoint: string, args: Record<string, unknown> = {}) => {
  return fetchAndThrow<T>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${endpoint}`, {
    method: 'PUT',
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

export const del = async <T = any>(endpoint: string, args: Record<string, unknown> = {}) => {
  return fetchAndThrow<T>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${endpoint}`, {
    method: 'DELETE',
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

const fetchAndThrow: <T>(input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<T> = async (input, init) => {
  const res = await fetch(input, init);
  if (res.status === 204) return null;
  const json = await res.json() as ApiObject;
  if (!json.ok) throw new ApiError(json);
  return json.response;
};

export class ApiError extends Error {
  constructor(public errorObject: ApiErrorObject) {
    super(`PaperStock API Error: ${errorObject.errorCode} ${errorObject.additionalInfo ? `\nInfo: ${errorObject.additionalInfo}` : ''}`);
  }
}
