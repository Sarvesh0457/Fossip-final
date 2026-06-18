const isLocalApiUrl = (url = "") =>
  url.includes("localhost") || url.includes("127.0.0.1");

export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;

  if (envUrl && !(import.meta.env.PROD && isLocalApiUrl(envUrl))) {
    return envUrl;
  }

  return import.meta.env.PROD ? "/api/v1" : "http://localhost:5000/api/v1";
};
