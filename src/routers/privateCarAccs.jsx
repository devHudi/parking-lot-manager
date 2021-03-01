import { useRouteMatch, Switch, Route } from "react-router-dom";

import { PrivateCarAccs, PrivateCarAccDetails } from "pages";

const PrivateCarAccsRouter = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <PrivateCarAccs />
      </Route>
      <Route exact path={`${match.url}/:accId`}>
        <PrivateCarAccDetails />
      </Route>
    </Switch>
  );
};

export default PrivateCarAccsRouter;
