import React from 'react';
import {Route} from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";

function Routes ({ match }) {
    return (
        <React.Fragment>
            <Route exact path={ match.url + "/profile" } component={Profile} />
            <Route exact path={ match.url + "/login" } component={Login} />
        </React.Fragment>
    );
}

export default Routes;