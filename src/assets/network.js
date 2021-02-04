const fetchGetJson = async (url) => {
  let response;
  try {
    response = await fetch(url);
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
