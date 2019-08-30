import React, {useContext, useEffect} from 'react'
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {userTransfer} from "../../fetch/requestAPI";
import {navigate} from "@reach/router";
import {GlobalContext} from "../../hooks/GlobalContext";


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

const accountType = [
    {
        value: '个人',
        label: '普通用户',
    },
    {
        value: '机构',
        label: '机构用户',
    },
];

export default function Transfer() {

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
                    账户转账
                </Typography>
                <div style={{padding: '16px'}}>
                    <hr style={{margin: 20}}/>
                </div>
                <TransferTable/>
            </Paper>
        </div>
    )
}

function TransferTable(props) {

    const [values, setValues] = React.useState({
        account: "",
        type: "个人",
        balance: 0,
        currency: 'RMB',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = async ()=> {
        // window.alert(values.type);
        let res = await userTransfer(values.account, values.balance, values.type, values.currency);
        if(res === "转账成功"){
            window.alert("转账成功");
        }
        // console.log(values);
    };

    const classes = useStyles();

    return(
        <div className={classes.child}>
            <div>
                <TextField
                    id="withdraw-account"
                    label="Account"
                    className={classes.textField}
                    type="email"
                    onChange={handleChange('account')}
                    margin="normal"
                />
                <TextField
                    id="account-type"
                    select
                    label="Account type"
                    className={classes.textField}
                    value={values.type}
                    onChange={handleChange('type')}
                    SelectProps={{
                        native: true,
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select your account type"
                    margin="normal"
                >
                    {accountType.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </div>
            <div>
                <TextField
                    id="withdraw-balance"
                    label="Balance"
                    className={classes.textField}
                    type="number"
                    onChange={handleChange('balance')}
                    placeholder={"0"}
                    margin="normal"
                />
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
            <Button variant="contained" color="primary" onClick={handleSubmit}>转账</Button>
        </div>
    )
}