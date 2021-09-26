import { BrowserRouter as Router, Switch } from "react-router-dom";
import AppRoutes from "./components/Auth/AppRoutes";
import routes from "./config/routes";
import { AuthProvider } from "./utils/context/AuthContext";
import Navbar from "./components/Navbar";
import ThemeColor from "./components/ThemColor";
import TabBar from "./components/TabBar";
import { useEffect, useState } from "react";
import {
  getPopularMovie,
  getTrendingMovies,
  getUpcomingmovie,
} from "./redux/actions/movies.action";
import { useDispatch } from "react-redux";
import { get_all_users } from "./redux/actions/user.action";

const App = () => {
  const [state, setState] = useState({
    smallScreen: false,
  });

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setState({ ...state, smallScreen: true });
    } else {
      setState({ ...state, smallScreen: false });
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrendingMovies());

    dispatch(get_all_users());
    dispatch(getPopularMovie());
    dispatch(getUpcomingmovie());

    const mediaQuery = window.matchMedia("(max-width:550px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  return (
    <AuthProvider>
      <ThemeColor>
        <Router>
          {!state.smallScreen && <Navbar />}
          <Switch>
            {routes.map((route) => (
              <AppRoutes
                key={route.path}
                exact
                path={route.path}
                component={route.component}
                isPrivate={route.isPrivate}
              />
            ))}
          </Switch>
          {state.smallScreen && <TabBar />}
        </Router>
      </ThemeColor>
    </AuthProvider>
  );
};

export default App;
