import { BrowserRouter as Router, Switch } from "react-router-dom";
import AppRoutes from "./components/Auth/AppRoutes";
import routes from "./config/routes";
import { AuthProvider } from "./utils/context/AuthContext";
import Navbar from "./components/Navbar";
import ThemeColor from "./components/ThemColor";

const App = () => {
  return (
    <AuthProvider>
      <ThemeColor>
        <Router>
          <Navbar />
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
        </Router>
      </ThemeColor>
    </AuthProvider>
  );
};

export default App;
