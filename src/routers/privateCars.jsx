import { useRouteMatch, Switch, Route } from "react-router-dom";

import { PrivateCars, PrivateCarDetails } from "pages";

const PrivateCarsRouter = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <PrivateCars />
      </Route>
      <Route exact path={`${match.url}/:carId`}>
        <PrivateCarDetails />
      </Route>
    </Switch>
  );
};

export default PrivateCarsRouter;
