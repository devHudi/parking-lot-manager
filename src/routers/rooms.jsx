import { useRouteMatch, Switch, Route } from "react-router-dom";

import { Rooms, RoomDetails } from "pages";

const RoomsRouter = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <Rooms />
      </Route>
      <Route exact path={`${match.url}/:roomId`}>
        RoomDetails
      </Route>
    </Switch>
  );
};

export default RoomsRouter;
