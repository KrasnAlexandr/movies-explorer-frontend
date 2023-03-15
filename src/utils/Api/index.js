import { DEFAULT_ERROR_MESSAGE } from '../constants';

class Api {
  constructor({ mainUrl, headers }) {
    this.mainUrl = mainUrl;
    this.headers = headers;
  }

  checkResponse(res) {
    return res.ok
      ? res.json()
      : res
          .json()
          .then(res =>
            Promise.reject(new Error(res.message || DEFAULT_ERROR_MESSAGE))
          );
  }
}

export default Api;
