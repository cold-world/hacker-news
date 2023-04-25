export async function http<T = any>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Response Error:' + response.text);
  }

  const data = await response.json();
  return data;
}
