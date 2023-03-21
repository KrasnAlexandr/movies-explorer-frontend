export const PAGE_MANAGER = {
  HOME: '/',
  MOVIES: '/movies',
  SAVED_MOVIES: '/saved-movies',
  PROFILE: '/profile',
  SIGNIN: '/signin',
  SIGNUP: '/signup'
};

export const GITHUB_LINK = 'https://github.com/KrasnAlexandr';

export const TECHS_PARAMS = [
  {
    href: 'https://doka.guide/html/',
    label: 'HTML'
  },
  {
    href: 'https://doka.guide/css/',
    label: 'CSS'
  },
  {
    href: 'https://doka.guide/js/',
    label: 'JS'
  },
  {
    href: 'https://ru.reactjs.org/',
    label: 'React'
  },
  {
    href: 'https://git-scm.com/',
    label: 'Git'
  },
  {
    href: 'https://expressjs.com/ru/',
    label: 'Express.js'
  },
  {
    href: 'https://www.mongodb.com/',
    label: 'mongoDB'
  }
];

export const HEADER_NAVIGATION_PARAMS = [
  {
    label: 'Главная',
    href: PAGE_MANAGER.HOME
  },
  {
    label: 'Фильмы',
    href: PAGE_MANAGER.MOVIES
  },
  {
    label: 'Сохранённые фильмы',
    href: PAGE_MANAGER.SAVED_MOVIES
  }
];

export const DEFAULT_ERROR_MESSAGE = 'Что-то пошло не так...';

export const MIN_IN_HOUR = 60;

export const SHORT_FILM_DURATION = 40;

export const MOVIES_PAGE_PARAMS = {
  WEB: {
    BREAKPOINT: 1280, //px
    MOVIES_TO_SHOW: 12,
    ADD_BY_N_MOVIES: 4
  },
  TABLET: {
    MOVIES_TO_SHOW: 8,
    ADD_BY_N_MOVIES: 2
  },
  MOBILE: {
    BREAKPOINT: 480, //px
    MOVIES_TO_SHOW: 5,
    ADD_BY_N_MOVIES: 1
  }
};

export const LOCAL_STORAGE_MAP = {
  JWT_TOKEN: 'jwt',
  MOVIES_PAGE: {
    INPUT: 'input',
    TOGGLE: 'toggle',
    SAVED_MOVIES: 'savedMovies',
    FIRST_PART_MOVIES: 'firstPartMovies',
    OTHER_MOVIES: 'otherMovies',
    FIRST_PART_SHORT_MOVIES: 'firstPartShortMovies',
    OTHER_SHORT_MOVIES: 'otherShortMovies'
  }
};
