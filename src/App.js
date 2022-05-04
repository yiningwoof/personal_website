import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TechProjects } from "./components/TechProjects/TechProjects";
import { Home } from "./components/Home/Home";
import { About } from "./components/About/About";
import { Photography } from "./components/Photography/Photography";
import { Footprints } from "./components/Footprints/Footprints";

import "./App.css";

import { Nav } from "./components/Nav/Nav";

function App() {
  const [home, setHome] = useState(true);
  useEffect(() => {
    window.location.pathname === "/" ? setHome(true) : setHome(false);
  });

  return (
    <>
      <Nav home={home} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/tech_projects">
          <TechProjects />
        </Route>
        <Route path="/about">
          <About></About>
        </Route>
        <Route path="/photography">
          <Photography></Photography>
        </Route>
        <Route path="/footprints">
          <Footprints></Footprints>
        </Route>
      </Switch>
    </>
  );
}

export default withRouter(App);
