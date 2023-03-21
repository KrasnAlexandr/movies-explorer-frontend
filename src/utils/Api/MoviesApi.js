import Api from './index';

class MoviesApi extends Api {
  constructor() {
    super({
      mainUrl: 'https://api.nomoreparties.co/beatfilm-movies',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  }

  getMovies() {
    return fetch(this.mainUrl, {
      headers: this.headers
    }).then(this.checkResponse);
  }
}

const moviesApi = new MoviesApi();

export default moviesApi;
