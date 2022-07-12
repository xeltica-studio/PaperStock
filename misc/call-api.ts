import { ApiObject } from "../types/api-object";

export const $post = async (endpoint: string, args: any) => {
  const e = await fetch(`/api/v1/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return e.status === 204 ? null : (await e.json()) as ApiObject;
};

export const $put = async (endpoint: string, args: any) => {
  const e = await fetch(`/api/v1/${endpoint}`, {
    method: 'PUT',
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return e.status === 204 ? null : (await e.json()) as ApiObject;
};

export const $delete = async (endpoint: string, args: any) => {
  const e = await fetch(`/api/v1/${endpoint}`, {
    method: 'DELETE',
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return e.status === 204 ? null : (await e.json()) as ApiObject;
};
