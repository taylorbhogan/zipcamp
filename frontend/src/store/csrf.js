import Cookies from "js-cookie";

// the Express backend server is config to be CSRF protected: will only accept reqs that have the right CSRF token in a header and the right value in a cookie
// this func sets the CSRF-TOKEN header and value for non-GET reqs
export async function csrfFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    // adding formData to req body will cause browser to automatically set appropriate headers & boundaries, so we must remove the Content-Type header
    if (options.headers["Content-Type"] === "multipart/form-data"){
      delete options.headers["Content-Type"]
    } else {
      options.headers["Content-Type"] =
        options.headers["Content-Type"] || "application/json";
    }
    options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
  }
  const res = await window.fetch(url, options);

  if (res.status >= 400) throw res;

  return res;
}

// call this func to get the "XSRF-TOKEN" cookie - ONLY FOR DEVELOPMENT
export function restoreCSRF() {
  return csrfFetch("/api/csrf/restore");
}
