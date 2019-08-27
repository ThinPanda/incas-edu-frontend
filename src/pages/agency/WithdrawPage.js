import React, {useContext, useEffect} from 'react'
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {agencyWithdraw} from "../../fetch/requestAPI";
import {GlobalContext} from "../../hooks/GlobalContext";
import {navigate} from "@reach/router";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 10),
    },
    paper: {
        padding: theme.spacing(3, 2),
    },
    child: {
        textAlign: 'center'
    },
    textField: {
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        margin: 25,
        width: 200,
    },
}));

const currencies = [
    {
        value: 'RMB',
        label: 'RMB',
    },
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

export default function Withdraw() {

    const { state } = useContext(GlobalContext);

    useEffect(() => {
        if (!state.isLogin){
            window.alert("您好,请先登录!");
            navigate("/login");
            return;
        }
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} component='div' elevation={5} >
                <br/>
                <Typography variant='h4' align='center'>
                    余额提现
                </Typography>
                <div style={{padding: '16px'}}>
                    <hr style={{margin: 20}}/>
                </div>
                <WithdrawTable/>
            </Paper>
        </div>
    )
}

function WithdrawTable(props) {

    const [values, setValues] = React.useState({
        balance: 0,
        currency: 'RMB',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = async ()=> {
        let res = await agencyWithdraw(values.balance, values.currency);
        if( res === "提现成功"){
            window.alert(res);
        }
    };

    const classes = useStyles();

    return(
        <div className={classes.child}>
            <div>
                <TextField
                    id="withdraw"
                    label="Balance"
                    className={classes.textField}
                    type="number"
                    // autoComplete="current-password"
                    onChange={handleChange('balance')}
                    placeholder={"0"}
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    id="currency-type"
                    select
                    label="Currency type"
                    className={classes.textField}
                    value={values.currency}
                    onChange={handleChange('currency')}
                    SelectProps={{
                        native: true,
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select your currency"
                    margin="normal"
                >
                    {currencies.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>提现</Button>
        </div>
    )
}