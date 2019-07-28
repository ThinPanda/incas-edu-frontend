import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
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
    // const [formInfo, setFormInfo] = useState({ username:"", password: ""});

    const { state, dispatch } = useContext(GlobalContext);
    // const inputLabel = React.useRef(null);
    // const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //     setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);

    const handleInputChange = name => event => {
        setFormInfo({ ...formInfo, [name]: event.target.value });
    };

    const handleInputSubmit = () => {
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
                        <FormControl variant="outlined" className={classes.formControl}>
                            {/*<InputLabel ref={inputLabel} htmlFor="outlined-age-simple">*/}
                            <InputLabel htmlFor="outlined-age-simple">
                                Age
                            </InputLabel>
                            <Select
                                value={formInfo.userType}
                                onChange={handleInputChange("userType")}
                                input={<OutlinedInput labelWidth={"100%"} name="age" id="outlined-age-simple" />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
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
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
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
                                <Link href="#" variant="body2">
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