import React, {useContext, useState} from "react";
import { makeStyles } from '@material-ui/styles';
import LayoutCenter from "../components/LayoutCenter";
import {
    Button,
    CircularProgress,
    FormControl,
    Input,
    InputLabel,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@material-ui/core'
import {navigate} from "@reach/router";
import Snackbar from "@material-ui/core/Snackbar";
import { GlobalContext } from "../hooks/GlobalContext";


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'spaceBetween',
        width: '200px',
        height: '105px',
    },
    loginButton: {
        // variant: 'contained',
        // color: 'primary',
        marginTop: 35,
    }
});


export default function LoginPage() {

    const [value, setValue] = useState('0');
    const [formInfo, setFormInfo] = useState({ username:"", password: ""});

    const { state, dispatch } = useContext(GlobalContext);

    const handleInputChange = (e) => {
        // console.log(e.target.id);
        switch (e.target.id) {
            case "username":
                setFormInfo({username: e.target.value, password: formInfo.password});
                break;
            case "password":
                setFormInfo({ username: formInfo.username, password: e.target.value });
                break;
        }
    };

    const handleValueChange = (e) => {
        setValue(e.target.value);
        setFormInfo({ username: "", password: ""});
    };

    const handleLogin = () => {
        if (formInfo.username === "1" && formInfo.password === "1") {
            dispatch({ operation: "login", type: "LOGIN" });
            dispatch({ operation: "username", type: "panda" });
            dispatch({ operation: "userType", type: "ORDINARY" });
        } else if (formInfo.username === "2" && formInfo.password === "2") {
            dispatch({ operation: "login", type: "LOGIN" });
            dispatch({ operation: "username", type: "panda" });
            dispatch({ operation: "userType", type: "AGENCY" });
        } else if (formInfo.username === "3" && formInfo.password === "3") {
            dispatch({ operation: "login", type: "LOGIN" });
            dispatch({ operation: "username", type: "panda" });
            dispatch({ operation: "userType", type: "ADMIN" });
        }
        navigate('/detail');
    };

    const classes = useStyles();

    return(
        <LayoutCenter>
            <div className={classes.root}>
                <Typography variant="h6">登录</Typography>
                <RadioGroup aria-label="position" name="position" value={value} onChange={handleValueChange} row>
                    <FormControlLabel
                        value="0"
                        control={<Radio color="primary" />}
                        label="用户"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label="机构"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="2"
                        control={<Radio color="primary" />}
                        label="管理员"
                        labelPlacement="start"
                    />
                </RadioGroup>
                <div className={classes.loginForm} >
                    <FormControl fullWidth>
                        <InputLabel htmlFor="username">用户名</InputLabel>
                        <Input id="username"
                               value={formInfo.username}
                               onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="password">密码</InputLabel>
                        <Input
                            id="password"
                            type="text"
                            value={formInfo.password}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </div>

                {/*<Button classes={classes.loginButton} disabled={loading} onClick={logIn}>*/}
                <Button
                    variant="contained"
                    color="primary"
                    classes={classes.loginButton}
                    onClick={handleLogin}
                >
                    {/*{logInFail ? '重试' : '登录'}*/}
                    {/*{loading && <ButtonProgress />}*/}
                    登录
                </Button>
            </div>
        </LayoutCenter>
    )
}