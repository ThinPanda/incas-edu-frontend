import React, {useContext, useEffect} from 'react';
import '../App.css'
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from "../hooks/GlobalContext";
import {navigate} from "@reach/router";
import {feature_login} from "../fetch/requestAPI";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 10),
    },
}));


export default function LoadingPage(props) {

    const classes = useStyles();
    const { dispatch } = useContext(GlobalContext);
    const { token } = props;
    // console.log("token", token);

    useEffect(() => {
        const featureLogin = async () => {
            try {
                let userInfo = await feature_login(token);
                // await console.log(userInfo);
                dispatch({ operation: "login", type: "LOGIN" });
                dispatch({ operation: "username", type: userInfo.username });
                dispatch({ operation: "userType", type: userInfo.userType.toUpperCase() });
                await setTimeout(function () {
                    navigate('/detail');
                }, 2000);
            } catch (err) {
                window.alert("登录失败，请重新登录！");
                console.log(err);
            }
        };
        featureLogin()
    }, []);


    return (
        <div className={classes.root}>
            <div id="loader-wrapper">
                <div id="loader"></div>
                <div className="loader-section section-left"></div>
                <div className="loader-section section-right"></div>
                <div id="load_title">正在登录中，请稍后...</div>
            </div>
        </div>
    );
}
