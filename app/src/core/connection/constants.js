// export const DEFAULT_BASE_URL = "http://localhost:9898/api";
// export const API_VERSION = "v1";

export const DEFAULT_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3100/api";
export const API_VERSION = process.env.API_VERSION || "v2";
export const API_SSE_ENDPOINT = process.env.API_SSE_ENDPOINT || "events";

// HTTP status codes
export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_NOT_MODIFIED = 304;

// Namespace for Cache API
export const CACHE_AVAILABLE = "caches" in window;
export const CACHE_KEY = "@CICBIM/CONNECTION";
