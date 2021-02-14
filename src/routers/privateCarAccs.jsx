import { useRouteMatch, Switch, Route } from "react-router-dom";

import { PrivateCarAccs } from "pages";

const PrivateCarAccsRouter = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <PrivateCarAccs />
      </Route>
    </Switch>
  );
};

export default PrivateCarAccsRouter;
