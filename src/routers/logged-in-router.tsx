import { UserRole } from "../__api__/types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Restaurants } from "../pages/client/restaurants";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import NotFoundPage from "../pages/404";
import { ConfirmEmail } from "../pages/user/confirm-email";

const ClientRouter = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
  <Route path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  console.log(loading, error, data);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === UserRole.Client && ClientRouter}
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};
