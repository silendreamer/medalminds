export async function fetchIndexHtml(sourceUrl: string): Promise<string> {
  const response = await fetch(sourceUrl, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Failed to fetch source page ${sourceUrl}: ${response.status} ${response.statusText}`);
  }

  return await response.text();
}
