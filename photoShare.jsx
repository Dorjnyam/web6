import React from "react";
import ReactDOM from "react-dom";
import { Grid, Typography, Paper } from "@mui/material";
import { HashRouter, Route, Switch } from "react-router-dom";

import "./styles/main.css";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";


class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
    };
  }

  handleUserNameChange = userName => {
    this.setState({ userName: userName });
  };

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Switch>
              <Route path="/users/:userId" render={props => <TopBar {...props} userName={this.state.userName} />} />
              <Route path="/photos/:userId" render={props => <TopBar {...props} userName={this.state.userName} />} />
              <Route
              render={ props => <TopBar {...props} userName={this.state.userName} />} />
              </Switch>
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="cs142-main-grid-item" elevation={3}>
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item" elevation={3}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Typography variant="h3" color="clay">
                        Welcome to my photosharing app! 
                      </Typography>
                    )}
                  />
                  <Route
                    path="/users/:userId"
                    render={(props) => (
                    <UserDetail {...props}
                      handler={this.handleUserNameChange} />
                    )}
                  />
                  <Route
                    path="/photos/:userId"
                    render={(props) => (
                    <UserPhotos {...props}
                      handler={this.handleUserNameChange} />
                    )}
                  />
                  <Route path="/users" component={UserList} />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<PhotoShare />, document.getElementById("photoshareapp"));

