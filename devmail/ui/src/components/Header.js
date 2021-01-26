// React Module Imports
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Material UI Imports
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ForwardIcon from "@material-ui/icons/Forward";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import { Button } from "@material-ui/core";

// Component Imports
import headerStyles from "../styles/headerStyles";

const Header = (props) => {
  const classes = headerStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async (event) => {
    await fetch("/api/logout/").then((res) => {
      if (res.status === 200) {
        props.history.push("/");
      }
    });
  };

  const handleForward = (location) => {
    props.history.push("/" + location);
  };

  const handleSearch = (event) => {
    if (event.code === "Enter") {
      let data = search;
      setSearch("");
      props.search(data);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            <Link to="/mail" className={classes.link}>
              DevMail
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={search}
              onFocus={handleDrawerClose}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => setSearch(event.target.value)}
              onSubmit={() => {
                props.search(search);
              }}
              onKeyDown={(event) => {
                handleSearch(event);
              }}
            />
          </div>
          <div className={classes.logout}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="inbox">
            <Link
              to="/mail"
              className={classes.link}
              onClick={() => props.resetReceived()}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
            </Link>
            <ListItemText
              primary="Inbox"
              onClick={() => handleForward("mail/")}
            />
          </ListItem>
          <ListItem button key="compose">
            <Link to="/compose" className={classes.link}>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
            </Link>
            <ListItemText
              primary="Compose"
              onClick={() => handleForward("compose/")}
            />
          </ListItem>
          <ListItem button key="sent">
            <Link
              to="/sent"
              className={classes.link}
              onClick={() => props.resetSent()}
            >
              <ListItemIcon>
                <ForwardIcon />
              </ListItemIcon>
            </Link>
            <ListItemText
              primary="Sent"
              onClick={() => handleForward("sent/")}
            />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
