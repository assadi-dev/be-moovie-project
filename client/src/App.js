import { BrowserRouter as Router, Switch } from "react-router-dom";
import AppRoutes from "./components/Auth/AppRoutes";
import routes from "./config/routes";
import { AuthProvider } from "./utils/context/AuthContext";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;
