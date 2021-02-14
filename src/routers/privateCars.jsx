import { useRouteMatch, Switch, Route } from "react-router-dom";

import { PrivateCars } from "pages";

const PrivateCarsRouter = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <PrivateCars />
      </Route>
    </Switch>
  );
};

export default PrivateCarsRouter;
