import { apiMovie, api } from "../../components/Api";
export const GET_TRENDING_MOVIES = "GET_TRENDING_MOVIES";
export const GET_POPULAR_MOVIES = "GET_POPULAR_MOVIES";
export const GET_UPCOMMING_MOVIES = "GET_UPCOMMING_MOVIES";
export const ADD_MOVIE_FAVORIE = "ADD_MOVIE_FAVORIE";
export const REMOVE_MOVIE_FAVORIE = "REMOVE_MOVIE_FAVORIE";

/**Action Post ***/

export const getTrendingMovies = () => {
  return async (dispatch) => {
    try {
      await apiMovie
        .get(
          `/trending/movie/week?api_key=${process.env.REACT_APP_KEY}&language=fr-FR&region=FR`
        )
        .then((res) => {
          let data = res.data.results.slice(0, 5);
          dispatch({ type: GET_TRENDING_MOVIES, payload: data });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPopularMovie = () => {
  return async (dispatch) => {
    try {
      await apiMovie
        .get(
          `movie/popular?api_key=${process.env.REACT_APP_KEY}&language=fr-FR&region=FR`
        )
        .then((res) => {
          dispatch({ type: GET_POPULAR_MOVIES, payload: res.data.results });
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUpcomingmovie = () => {
  return async (dispatch) => {
    try {
      await apiMovie
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_KEY}&language=fr-FR&page=1&region=FR`
        )
        .then((res) => {
          dispatch({ type: GET_UPCOMMING_MOVIES, payload: res.data.results });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addFavoris = (id) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: ADD_MOVIE_FAVORIE, payload: id });
      await api
        .patch(`/user/movies/add/${id}`)
        .then((res) => {
          dispatch({ type: ADD_MOVIE_FAVORIE, payload: id });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFavoris = (id) => {
  return async (dispatch) => {
    try {
      await api.patch(`/user/movies/remove/${id}`).then((res) => {
        dispatch({ type: REMOVE_MOVIE_FAVORIE, payload: id });
      });
    } catch (error) {
      console.log(error);
    }
  };
};
