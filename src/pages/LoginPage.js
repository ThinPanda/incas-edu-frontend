import React, {useContext, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {navigate} from "@reach/router";
import {GlobalContext} from "../hooks/GlobalContext";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import * as MyFetch from "../fetch/requestAPI"



const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1562154151-9f409048035f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginPage1() {
    const classes = useStyles();

    const [formInfo, setFormInfo] = useState({
        userType: "",
        username: "",
        password: "",
    });

    const [remember, setRemember] = useState(false);
    const { dispatch } = useContext(GlobalContext);

    useEffect(() => {
        let keyName = localStorage.getItem("keyName");
        let keyPass = localStorage.getItem("keyPass");
        let keyType = localStorage.getItem("keyType");
        let remember_box = localStorage.getItem("rememberLogin");
        if (keyPass && keyType){
            setFormInfo({
                userType: keyType,
                username: keyName,
                password: keyPass
            });
            setRemember(remember_box === "true");
        }
    }, []);

    const handleInputChange = name => event => {
        setFormInfo({ ...formInfo, [name]: event.target.value });
    };

    const handleInputSubmit = async () => {
        dispatch({ operation: "login", type: "LOGIN" });
        dispatch({ operation: "username", type: formInfo.username });
        dispatch({ operation: "userType", type: formInfo.userType });

        try {
            await MyFetch.login(formInfo.username, formInfo.password, formInfo.userType);
            await navigate('/detail');
        } catch (err) {
            window.alert("登录失败，请重新登录！")
            console.log(err);
        }

        // 保存用户名和密码
        localStorage.setItem("keyName", formInfo.username);
        localStorage.setItem("rememberLogin", remember);
        if (remember){
            localStorage.setItem("keyPass", formInfo.password);
            localStorage.setItem("keyType", formInfo.userType);
        } else {
            localStorage.removeItem("keyPass");
            localStorage.removeItem("keyType");
        }
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <FormControl variant="outlined" style={{width: "100%"}}>
                            {/*<InputLabel ref={inputLabel} htmlFor="outlined-age-simple">*/}
                            <InputLabel htmlFor="outlined-age-simple">
                                user type
                            </InputLabel>
                            <Select
                                value={formInfo.userType}
                                onChange={handleInputChange("userType")}
                                input={<OutlinedInput fullWidth={true} name="userType" id="outlined-age-simple" />}
                            >
                                {/*<MenuItem value="">*/}
                                    {/*<em>None</em>*/}
                                {/*</MenuItem>*/}
                                <MenuItem value={"ORDINARY"}>ordinary</MenuItem>
                                <MenuItem value={"AGENCY"}>agency</MenuItem>
                                <MenuItem value={"ADMIN"}>admin</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Email Address"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={handleInputChange("username")}
                            value={formInfo.username}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleInputChange("password")}
                            value={formInfo.password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" checked={remember} onChange={(e)=> setRemember(e.target.checked)}/>}
                            label="Remember me"
                        />
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleInputSubmit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}