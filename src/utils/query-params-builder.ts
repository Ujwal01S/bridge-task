// utility function to build query params
export function buildQueryParams(
  params: Record<string, string | number | null | undefined>
): string {
  const parts = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
    );

  return parts.length ? `?${parts.join("&")}` : "";
}
