import Api from './index';

class AuthApi extends Api {
  constructor() {
    super({
      mainUrl: 'https://api.movies.alexred.nomoredomains.work',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  signUp({ name, password, email }) {
    return fetch(`${this.mainUrl}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password, email })
    }).then(this.checkResponse);
  }

  signIn({ email, password }) {
    return fetch(`${this.mainUrl}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    }).then(this.checkResponse);
  }

  signOut() {
    localStorage.clear();
  }
}

const authApi = new AuthApi();
export default authApi;
