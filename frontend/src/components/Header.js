import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header() {
    const classes = useStyles();

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" className={classes.title}>
                        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                            School Uniforms
                        </Link>
                    </Typography>
                    {/*<Typography variant="h4" className={classes.title}>
                        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                            Boys
                        </Link>{' |   '}
                        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                            Girls
                        </Link>
                    </Typography>*/}
                        <Button color="inherit">
                            {userInfo ? (
                                <Link to='/profile' style={{ textDecoration: 'none', color: 'white' }}>
                                    <h3>{userInfo.name} &nbsp;&nbsp;</h3>
                                </Link>
                            ):(
                                <Link to='/signin' style={{ textDecoration: 'none', color: 'white' }}>
                                    <h3>Login</h3>
                                </Link>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <div style={{display: 'flex'}}>
                                    <Link to='/products' style={{ textDecoration: 'none', color: 'white' }}>
                                        <h3>All Products &nbsp;&nbsp;</h3>
                                    </Link>
                                    <Link to='/orders' style={{ textDecoration: 'none', color: 'white' }}>
                                        <h3>Orders</h3>
                                    </Link>
                                </div>
                            )}
                        </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;