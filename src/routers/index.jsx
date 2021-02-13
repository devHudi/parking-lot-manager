import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Layout } from "components";

import { Home } from "pages";

const DefaultRouter = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/">
            <Home />
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
};

export default DefaultRouter;
