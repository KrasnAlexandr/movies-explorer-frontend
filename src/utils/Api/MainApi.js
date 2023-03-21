import Api from './index';
import { LOCAL_STORAGE_MAP } from '../constants';

class MainApi extends Api {
  constructor() {
    super({
      mainUrl: 'https://api.movies.alexred.nomoredomains.work',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  getUserInfo(jwt) {
    return fetch(`${this.mainUrl}/users/me`, {
      headers: { Authorization: `Bearer ${jwt}`, ...this.headers }
    }).then(this.checkResponse);
  }

  updateUserInfo({ name, email }) {
    return fetch(`${this.mainUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_MAP.JWT_TOKEN
        )}`,
        ...this.headers
      },
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`
      })
    }).then(this.checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this.mainUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_MAP.JWT_TOKEN
        )}`,
        ...this.headers
      }
    }).then(this.checkResponse);
  }

  addMovie(moveData) {
    return fetch(`${this.mainUrl}/movies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_MAP.JWT_TOKEN
        )}`,
        ...this.headers
      },
      body: JSON.stringify({
        ...moveData
      })
    }).then(this.checkResponse);
  }

  removeMovie(moveId) {
    return fetch(`${this.mainUrl}/movies/${moveId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          LOCAL_STORAGE_MAP.JWT_TOKEN
        )}`,
        ...this.headers
      }
    }).then(this.checkResponse);
  }
}

const mainApi = new MainApi();

export default mainApi;
