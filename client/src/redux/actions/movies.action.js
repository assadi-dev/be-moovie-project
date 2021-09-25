import { apiMovie } from "../../components/Api";
export const GET_TRENDING_MOVIES = "GET_TRENDING_MOVIES";
export const GET_POPULAR_MOVIES = "GET_POPULAR_MOVIES";
export const GET_UPCOMMING_MOVIES = "GET_UPCOMMING_MOVIES";

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
