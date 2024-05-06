import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { withRouter } from "react-router-dom";
import "./styles.css";
import axios from "axios";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

  componentDidMount() {
    const url = "http://localhost:3000/test/info";

    axios
      .get(url)
      .then(() => {
        console.log("** Success: fetched data from " + url + " **");
      })
      .catch((error) => {
        if (error.response) {
          console.log(
            "** Error: status code from server is out of the range of 2xx. **\n",
            error.response.status
          );
        } else if (error.request) {
          console.log(
            "** Error: request was made and no response was received. **\n",
            error.request
          );
        } else {
          console.log(
            "** Error: something happened in the setting up the request. **\n",
            error.message
          );
        }
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.userName !== prevProps.userName) {
      this.setState({ userName: this.props.userName });
    }
  }

  render() {
    const { userName } = this.state;
    const { match } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dorjnyam
          </Typography>
          <Typography variant="h5">
            {match.path.includes("/photos/") && "Photos of "}
            {match.path.includes("/users/") && "Details of "}
            {match.params.userId && userName}
            {match.path === "/" && "PhotoShare App"}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(TopBar);
