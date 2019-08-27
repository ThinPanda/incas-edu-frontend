import React, {useContext, useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {RechargeAuditList, WithdrawAuditList} from "../../components/AuditList";
import {
    adminGetRechargeList,
    adminGetWithdrawList,
} from "../../fetch/requestAPI";
import {GlobalContext} from "../../hooks/GlobalContext";
import {navigate} from "@reach/router";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 10),
    },
    paper: {
        padding: theme.spacing(3, 2),
    },
    avatar: {
        width: 100,
        height: 100,
        marginLeft: 100,
    },
    showData: {
        flexGrow: 1,
        textAlign: "center",
    }
}));

export default function AuditTrading() {

    const classes = useStyles();
    const { state } = useContext(GlobalContext);

    const [ rechargeList, setRechargeList ] = useState(null);
    const [ withdrawList, setWithdrawList ] = useState(null);

    useEffect(() => {

        if (!state.isLogin){
            window.alert("您好,请先登录!");
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            const rechargeList = await adminGetRechargeList();
            setRechargeList(rechargeList);
            console.log(rechargeList);

            const withdrawList = await adminGetWithdrawList();
            setWithdrawList(withdrawList);
            console.log(withdrawList);
        };
        fetchData();
    }, []);

    return (
        <div>
            <Paper className={classes.paper} component='div' elevation={5} >
                <br/>
                <Typography variant='h4' align='center'>
                    用户充值审核
                </Typography>
                <div style={{padding: '16px'}}>
                    <hr style={{margin: 20}}/>
                </div>
                <RechargeAuditList data={rechargeList}/>
            </Paper>
            <Paper className={classes.paper} style={{marginTop: "30px"}} component='div' elevation={5} >
                <br/>
                <Typography variant='h4' align='center'>
                    机构提现审核
                </Typography>
                <div style={{padding: '16px'}}>
                    <hr style={{margin: 20}}/>
                </div>
                <WithdrawAuditList data={withdrawList}/>
            </Paper>
        </div>
    )
}