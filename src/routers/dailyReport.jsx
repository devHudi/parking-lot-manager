import { useRouteMatch, Switch, Route } from "react-router-dom";

import { DailyReport } from "pages";

const PrivateCarAccsRouter = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <DailyReport />
      </Route>
    </Switch>
  );
};

export default PrivateCarAccsRouter;
