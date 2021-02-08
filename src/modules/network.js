import {networkProxyUrl} from "../settings";

/**
 * Creates HTTP Get request
 *
 * @param {String} url API endpoint
 * @param {Boolean} useProxy wheter to use the proxy server
 * @returns {Object} json data
 */
const fetchGetJson = async (url, useProxy = false) => {
  let response;
  try {
    response = await fetch(`${useProxy ? networkProxyUrl : ''}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('network fetchGet error', error.message);
  }
  const responseJson = await response.json();
  return responseJson;
};

export {fetchGetJson};
