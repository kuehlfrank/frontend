export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  options?: RequestInit,
): Promise<{} | { err: ResponseError }> {
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}

export async function requestPrivate(
  url: string,
  token: string,
  options?: RequestInit,
): Promise<{} | { err: ResponseError }> {
  if (options === undefined) {
    options = {};
  }
  options.headers = {
    Authorization: `Bearer ${token}`,
  };
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}

export async function postPrivate(
  url: string,
  token: string,
  data: any,
  options?: RequestInit,
): Promise<{} | { err: ResponseError }> {
  if (options === undefined) {
    options = {};
  }
  options.method = 'POST';
  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  options.body = JSON.stringify(data);
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}

export async function deletePrivate(
  url: string,
  token: string,
  options?: RequestInit,
): Promise<{} | { err: ResponseError }> {
  if (options === undefined) {
    options = {};
  }
  options.method = 'DELETE';
  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}
