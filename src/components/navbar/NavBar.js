import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import {Toolbar} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

class NavBar extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6">
                            ImageHUB
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default NavBar;
