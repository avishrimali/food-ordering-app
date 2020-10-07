import React, { Component } from "react";
import "./Header.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import LoginSignupModal from "../../common/modal/LoginSignupModal";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      loggedInCustomeName: sessionStorage.getItem("first_name"),
      anchorEl: null,
      openLoginSignupModal: false,
      error: false,
      erorCode: null,
      errorMsg: null,
    };
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  // close menu
  menuCloseHandler = () => {
    this.setState({
      anchorEl: null,
    });
  };

  // open profile page
  menuMyAccountHandler = () => {
    this.menuCloseHandler();
    this.props.history.push("/profile");
  };

  // setting up the text search
  onSearchTextChange = (e) => {
    this.props.getRestaurantData(e.currentTarget.value);
  };

  // open signup modal
  openLoginSignupModal = () => {
    this.setState({
      openLoginSignupModal: true,
    });
  };

  // close signup modal
  onCloseLoginSignupModal = (firstName) => {
    this.setState({
      openLoginSignupModal: false,
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      loggedInCustomeName: firstName, //sessionStorage.getItem("first_name")
    });
  };

  // logout and remove token
  logoutHandler = () => {
    sessionStorage.removeItem("access-token");
    this.menuCloseHandler();
    this.setState({
      openLoginSignupModal: false,
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      loggedInCustomeName: "",
    });
    this.props.history.push("/");
  };

  redirectToHome = () => {
    this.props.history.push("/");
  };

  render() {
    const {
      loggedIn,
      loggedInCustomeName,
      openLoginSignupModal,
      anchorEl,
    } = this.state;
    return (
      <div className="grow" style={{ minWidth: "400px" }}>
        <AppBar position="static" style={{ backgroundColor: "#263238" }}>
          <Toolbar>
            <Grid container>
              <Grid style={{ minWidth: "400px" }} item xs={12} sm={4}>
                <IconButton
                  edge="start"
                  onClick={this.redirectToHome}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <FastfoodIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={4}>
                {this.props.showSearchBar ? (
                  <div
                    className="search"
                    style={{ borderBottom: "solid black 0.1rem" }}
                  >
                    <div className="searchIcon">
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search by Restaurant Name"
                      className="inputRoot inputInput"
                      inputProps={{ "aria-label": "search" }}
                      onChange={this.onSearchTextChange}
                    />
                  </div>
                ) : (
                  ""
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                style={{ gridColumnStart: "revert", minWidth: "400px" }}
              >
                <div className="loginbuttonArea">
                  {loggedIn ? (
                    <IconButton
                      id="profile-icon"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      onClick={this.handleClick}
                    >
                      <AccountCircleIcon />
                      <Typography>{loggedInCustomeName}</Typography>
                    </IconButton>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={this.openLoginSignupModal}
                    >
                      <AccountCircleIcon />
                      Login
                    </Button>
                  )}
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <LoginSignupModal
          {...this.props}
          openLoginSignupModal={openLoginSignupModal}
          onCloseLoginSignupModal={this.onCloseLoginSignupModal}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.menuCloseHandler}
        >
          <MenuItem onClick={this.menuMyAccountHandler}>My account</MenuItem>
          <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}
export default Header;
