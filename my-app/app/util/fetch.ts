const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const get = async (url: string) => {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const fullUrl = `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add API key to headers (adjust header name based on your API requirements)
  if (API_KEY) {
    headers["Authorization"] = `Bearer ${API_KEY}`;
  }

  const response = await fetch(fullUrl, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const post = async (url: string, body: any) => {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const fullUrl = `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (API_KEY) {
    headers["Authorization"] = `Bearer ${API_KEY}`;
  }

  const response = await fetch(fullUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to post data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};