import { useRouteMatch, Switch, Route } from "react-router-dom";

import { Rooms, RoomDetails, FreeTickets, TransferStake, Cars } from "pages";

const RoomsRouter = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <Rooms />
      </Route>
      <Route exact path={`${match.url}/:roomId`}>
        <RoomDetails />
      </Route>
      <Route exact path={`${match.url}/:roomId/free-tickets`}>
        <FreeTickets />
      </Route>
      <Route exact path={`${match.url}/:roomId/transfer-stake`}>
        <TransferStake />
      </Route>
      <Route exact path={`${match.url}/:roomId/cars`}>
        <Cars />
      </Route>
    </Switch>
  );
};

export default RoomsRouter;
