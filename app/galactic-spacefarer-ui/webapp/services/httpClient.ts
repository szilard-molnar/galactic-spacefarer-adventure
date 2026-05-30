import type { ODataErrorResponse } from "../types/odata";

export async function request<TResponse>(
  url: string,
  options?: RequestInit
): Promise<TResponse> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      ...(options?.headers ?? {})
    },
    ...options
  });

  if (!response.ok) {
    let message = response.statusText;

    try {
      const errorBody = (await response.json()) as ODataErrorResponse;
      message = errorBody.error?.message ?? message;
    } catch {
      // ignore non-json error response
    }

    throw new Error(`Request failed: ${response.status} ${message}`);
  }

  return response.json() as Promise<TResponse>;
}