import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Layout } from "components";

import {
  Rooms,
  RoomAccs,
  PrivateCars,
  PrivateCarAccs,
  PaidTickets,
} from "pages";

const DefaultRouter = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/">
            <Rooms />
          </Route>
          <Route exact path="/room-accs">
            <RoomAccs />
          </Route>
          <Route exact path="/private-cars">
            <PrivateCars />
          </Route>
          <Route exact path="/private-car-accs">
            <PrivateCarAccs />
          </Route>
          <Route exact path="/paid-tickets">
            <PaidTickets />
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
};

export default DefaultRouter;
