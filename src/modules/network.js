// public cors-anywhere accepts only 50 request per hour and should be used only for random testing
// TODO: swithch to some other service
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

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
    response = await fetch(`${useProxy ? proxyUrl : ''}${url}`);
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
