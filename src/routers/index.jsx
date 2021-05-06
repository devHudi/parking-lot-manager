import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Layout } from "components";

import { PaidTickets } from "pages";

import RoomsRouter from "./rooms";
import RoomAccsRouter from "./roomAccs";
import PrivateCarsRouter from "./privateCars";
import PrivateCarAccsRouter from "./privateCarAccs";
import DailyReport from "./dailyReport";

const DefaultRouter = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/">
            <Redirect to="/rooms" />
          </Route>
          <Route path="/rooms">
            <RoomsRouter />
          </Route>
          <Route path="/room-accs">
            <RoomAccsRouter />
          </Route>
          <Route path="/private-cars">
            <PrivateCarsRouter />
          </Route>
          <Route path="/private-car-accs">
            <PrivateCarAccsRouter />
          </Route>
          <Route exact path="/paid-tickets">
            <PaidTickets />
          </Route>
          <Route exact path="/daily-report">
            <DailyReport />
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
};

export default DefaultRouter;
