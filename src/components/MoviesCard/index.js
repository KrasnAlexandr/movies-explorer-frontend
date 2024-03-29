import './MoviesCard.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LOCAL_STORAGE_MAP, PAGE_MANAGER } from '../../utils/constants';
import mainApi from '../../utils/Api/MainApi';
import React, { memo } from 'react';
import { timeConverter } from '../../utils';

const MoviesCard = ({ data, setMovesToShow, userMovies }) => {
  const currentPage = useLocation().pathname;
  const [isSavedMovie, setIsSavedMovie] = useState(false);
  const [moveId, setMoveId] = useState('');

  const { trailerLink, image, nameRU, duration } = data;

  const movieImage = imageLink => `https://api.nomoreparties.co/${imageLink}`;

  const handleSaveMovie = async () => {
    await mainApi
      .addMovie({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: movieImage(image.url),
        trailerLink: data.trailerLink,
        thumbnail: movieImage(image.formats.thumbnail.url),
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
      .then(movieData => {
        setMovesToShow(currentList => {
          localStorage.setItem(
            LOCAL_STORAGE_MAP.MOVIES_PAGE.SAVED_MOVIES,
            JSON.stringify([movieData, ...currentList])
          );
          return [movieData, ...currentList];
        });
        setMoveId(movieData._id);
        setIsSavedMovie(true);
      })
      .catch(err => console.error(err.message));
  };

  const handleRemoveMovie = async () => {
    await mainApi
      .removeMovie(moveId)
      .then(() => {
        setMoveId(null);
        setIsSavedMovie(false);
        setMovesToShow(savedMoviesList => {
          const newList = savedMoviesList.filter(movie => movie._id !== moveId);
          localStorage.setItem(
            LOCAL_STORAGE_MAP.MOVIES_PAGE.SAVED_MOVIES,
            JSON.stringify(newList)
          );
          return newList;
        });
      })
      .catch(err => console.error(err.message));
  };

  const onClickLike = () => {
    isSavedMovie ? handleRemoveMovie() : handleSaveMovie();
  };

  const currentButton = () => {
    return currentPage === PAGE_MANAGER.MOVIES ? (
      <button
        type='button'
        className={`movie__like ${
          isSavedMovie ? 'movie__like_type_active' : ''
        }`}
        title={
          isSavedMovie
            ? 'Удалить фильм из коллекции'
            : 'Добавить фильм в коллекцию'
        }
        onClick={onClickLike}
      />
    ) : (
      <button
        type='button'
        className='movie__delete'
        title='Удалить фильм из коллекции'
        onClick={handleRemoveMovie}
      />
    );
  };

  useEffect(() => {
    userMovies &&
      userMovies.forEach(movie => {
        if (movie.movieId === data.id) {
          setIsSavedMovie(true);
          setMoveId(movie._id);
        }
      });

    if (data._id) {
      setMoveId(data._id);
    }
  }, [userMovies, data]);

  const currentImage = () => {
    return currentPage === PAGE_MANAGER.MOVIES ? movieImage(image.url) : image;
  };

  return (
    <div className='movie'>
      <a href={trailerLink} target='_blank'>
        <img className='movie__image' src={currentImage()} alt={nameRU} />
      </a>
      <div className='movie__info'>
        <p className='movie__name'>{nameRU}</p>
        <div className='movie__button'>{currentButton()}</div>
        <p className='movie__duration'>{timeConverter(duration)}</p>
      </div>
    </div>
  );
};

export default memo(MoviesCard);
