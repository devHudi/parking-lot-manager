import { useRouteMatch, Switch, Route } from "react-router-dom";

import { RoomAccs } from "pages";

const RoomAccsRouter = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <RoomAccs />
      </Route>
    </Switch>
  );
};

export default RoomAccsRouter;
