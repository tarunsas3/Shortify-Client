import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Reset from "./components/Reset";
import Verify from "./components/Verify";
import ShortenURL from "./components/ShortenURL";
import RedirectURL from "./components/RedirectURL";
import Dashboard from "./components/Dashboard";
import "./App.css";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  const toggleLoggedIn = () => {
    setIsLogged(true);
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/login" />} />
          <Route
            exact
            path="/login"
            component={(props) => (
              <Login
                {...props}
                isLogged={isLogged}
                toggleLoggedIn={toggleLoggedIn}
              />
            )}
          />
          <Route exact path="/signup" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/verify/:id/:hash" component={Reset} />
          <Route exact path="/activate/:hash" component={Verify} />
          <Route
            exact
            path="/urlshortner"
            component={() => <ShortenURL isLogged={isLogged} />}
          />
          <Route exact path="/l/:hash" component={RedirectURL} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
