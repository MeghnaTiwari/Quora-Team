import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import CourseSideBar from "../CourseSideBar/CourseSideBar";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import People from "../People/People";
import Assignments from "../Assignments/Assignments";
import Announcements from "../Announcements/Announcements";
import NewAssignment from "../NewAssignment/NewAssignment";
import submit from "../submit/submit";
import Files from "../Files/Files";
import CourseInfo from "../CourseInfo/CourseInfo";
import Submission from "../submission/Submission";

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      books: []
    };
  }

  render() {
    //iterate over books to create a table row
    console.log("in course:" + this.props.match.params.Id);
    return (
      <div className="row">
        <div className="col-md-1">
          <Navbar />
        </div>
        <div className="col-md-11">
          <Header />
          <div className="row">
            <div className="col-md-2">
              <CourseSideBar id={this.props.match.params.Id} />
            </div>
            <div className="col-md-10">
              <div className="col-md-12 courseContents">
                <Switch>
                  <Route path="/courses/people" component={People} />
                  <Route
                    path="/courses/:id/Announcements"
                    component={Announcements}
                  />
                  <Route
                    path="/courses/:id/Assignments"
                    component={Assignments}
                  />
                  <Route
                    path="/courses/:id/assignment/:asid"
                    component={Submission}
                  />
                  <Route
                    path="/courses/:id/NewAssignment"
                    component={NewAssignment}
                  />

                  <Route path="/courses/:id/Files" component={Files} />
                  <Route path="/courses/:id/Home" component={CourseInfo} />
                  <Route path="/courses/:id/People" component={People} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Answer);
