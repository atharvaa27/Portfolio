const baseUrl = import.meta.env.BASE_URL;

export const withBase = (path = "") => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const normalizedPath = path.replace(/^\/+/, "");

  return normalizedPath ? `${normalizedBase}${normalizedPath}` : normalizedBase;
};

export const homeHref = `${withBase()}#`;
