import Api from './index';

class MainApi extends Api {
  constructor() {
    super({
      mainUrl: 'https://api.movies.alexred.nomoredomains.work',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  getUserInfo() {
    return fetch(`${this.mainUrl}/users/me`, {
      headers: this.headers
    }).then(this.checkResponse);
  }

  updateUserInfo({ name, email }) {
    return fetch(`${this.mainUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`
      })
    }).then(this.checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this.mainUrl}/movies`, {
      headers: this.headers
    }).then(this.checkResponse);
  }

  addMovie(moveData) {
    return fetch(`${this.mainUrl}/movies`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        ...moveData
      })
    }).then(this.checkResponse);
  }

  removeMovie(moveId) {
    return fetch(`${this.mainUrl}/movies/${moveId}`, {
      method: 'DELETE',
      headers: this.headers
    }).then(this.checkResponse);
  }
}

const mainApi = new MainApi();

export default mainApi;
