import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "../../App.css";
import "./Dashboard.css";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Answer from "../Answer/Answer";
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  //Dummy componenet did mount
  render() {
    return (
      <div>
        <Navbar />

        <div>
          <Switch>
            <Route path="/Dashboard/home" component={Home} />
            <Route path="/Dashboard/home" component={Answer} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginStateStore: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Dashboard));
