import React from 'react'
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


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

const payment = [
    {
        value: '支付宝',
        label: 'Alipay',
    },
    {
        value: '微信',
        label: 'WeChat',
    },
];

export default function RechargePage() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} component='div' elevation={5} >
                <br/>
                <Typography variant='h4' align='center'>
                    账户充值
                </Typography>
                <div style={{padding: '16px'}}>
                    <hr style={{margin: 20}}/>
                </div>
                <RechargeTable/>
            </Paper>
        </div>
    )
}

function RechargeTable(props) {

    const [values, setValues] = React.useState({
        balance: 0,
        payment: '支付宝',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const classes = useStyles();

    return(
        <div className={classes.child}>
            <div>
                <TextField
                    id="recharge"
                    label="Balance"
                    className={classes.textField}
                    type="number"
                    // autoComplete="current-password"
                    onChange={handleChange('balance')}
                    placeholder={0}
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    id="payment-method"
                    select
                    label="Currency type"
                    className={classes.textField}
                    value={values.payment}
                    onChange={handleChange('payment')}
                    SelectProps={{
                        native: true,
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select your payment method"
                    margin="normal"
                >
                    {payment.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </div>
            <Button variant="contained" color="primary">充值</Button>
        </div>
    )
}