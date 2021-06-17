import Cookies from 'js-cookie';

// the Express backend server is config to be CSRF protected: will only accept reqs that have the right CSRF token in a header and the right value in a cookie
// this func sets the CSRF-TOKEN header and value for non-GET reqs
export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to "application/json", and set the "XSRF-TOKEN" header to the value of the "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  // call the default window's fetch with the url and the options passed in
  const res = await window.fetch(url, options);

  // if the response status code is 400 or above, then throw an error with the error being the response
  if (res.status >= 400) throw res;

  // if the response status code is under 400, then return the response to the next promise chain
  return res;
}

// call this func to get the "XSRF-TOKEN" cookie - ONLY FOR DEVELOPMENT
export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore');
}
