import { useRouteMatch, Switch, Route } from "react-router-dom";

import { RoomAccs, RoomAccDetails, BillPrint } from "pages";

const RoomAccsRouter = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <RoomAccs />
      </Route>
      <Route exact path={`${match.url}/:roomId`}>
        <RoomAccDetails />
      </Route>
      <Route exact path={`${match.url}/:roomId/print/:accId`}>
        <BillPrint />
      </Route>
    </Switch>
  );
};

export default RoomAccsRouter;
