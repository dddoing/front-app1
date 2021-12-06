import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RestaurantDetail, RestaurantList} from "./Restaurant";

class Router extends React.Component {
    //
    render() {
      return (
          <BrowserRouter>
              <Routes>
                  <Route exact path="/restaurant" element={<RestaurantDetail/>}/>
                  <Route exact path="/" element={<RestaurantList/>}/>
              </Routes>
          </BrowserRouter>
      )
    }
}

export default Router;
