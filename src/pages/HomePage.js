import React from "react";
import {withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import LayoutCenter from "../components/LayoutCenter";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {navigate} from "@reach/router";


const useStyles = makeStyles(theme => ({
    background: {
        // background: 'linear-gradient(45deg, #4caf50 30%, #00b0ff 90%)',
        // background: 'linear-gradient(to left bottom, hsl(118, 100%, 85%) 0%, hsl(168, 100%, 85%) 100%)',
        height: '200vh'
    },
    page1: {
        background: 'linear-gradient(to left bottom, hsl(118, 100%, 85%) 0%, hsl(168, 100%, 85%) 100%)',
        height: '100vh'
    },
    login: {
        position: 'fixed',
        marginTop: '5vh',
        marginLeft: '88vw',
        zIndex: 1,
    }
}));

export default function HomePage(props) {

    const classes = useStyles();

    return(
        <div className={classes.background}>
            <div className={classes.login}>
                <Button color="primary" onClick={() => navigate('/login')}>登录</Button>|
                <Button color="primary" onClick={() => navigate('/register')}>注册</Button>
            </div>
            <section className={classes.page1}>
                <LayoutCenter>
                    this is incas-lab front-end developed by thinPanda using react
                </LayoutCenter>
            </section>
        </div>
    )
}
