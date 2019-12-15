import React, {useContext, useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {AppealAuditList, RechargeAuditList, WithdrawAuditList} from "../../components/AuditList";
import {
    adminGetRechargeList,
    adminGetWithdrawList,
    getApprovedAppealList,
    getCheckedAppealList,
    getRejectAppealList,
    getUncheckedAppealList,
} from "../../fetch/requestAPI";
import {GlobalContext} from "../../hooks/GlobalContext";
import {navigate} from "@reach/router";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import {AppealResultList} from "../../components/SimpleDataList";


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

export default function AuditAppeal() {

    const classes = useStyles();
    const { state } = useContext(GlobalContext);

    const [ checked, setChecked ] = useState(null);
    const [ unchecked, setUnchecked ] = useState(null);
    const [ approved, setApproved ] = useState(null);
    const [ reject, setReject ] = useState(null);

    useEffect(() => {

        if (!state.isLogin){
            window.alert("您好,请先登录!");
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            let unchecked = await getUncheckedAppealList();
            setUnchecked(unchecked);
            let checked = await getCheckedAppealList();
            // 把一个对象中的两个集合合并成一个
            let checked_all = [...checked.approved, ...checked.reject];
            setChecked(checked_all);
        };
        fetchData();
    }, []);

    return (
        <div>
            <Paper className={classes.paper} component='div' elevation={5} >
                <br/>
                <Typography variant='h4' align='center'>
                    资源侵权申诉审核
                </Typography>
                <div style={{padding: '16px'}}>
                    <hr style={{margin: 20}}/>
                </div>
                <Typography variant="subtitle2" color="textSecondary" align="center">
                    管理员根据侵权材料中所提取出的水印信息结合弃权理由，对机构用户发起的资源侵权上述进行审核
                </Typography>
                <br/>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <Button variant="outlined" color="primary" className={classes.button}>申诉记录</Button>
                    <Button variant="outlined" color="primary" className={classes.button}>立即申诉</Button>
                </div>
            </Paper>
            <Paper className={classes.paper} style={{marginTop: "30px"}} component='div' elevation={5} >
                <div style={{marginBottom: "20px"}}>
                    <br/>
                    <Typography variant='h5' align='center'>
                        待审核列表
                    </Typography>
                    <div style={{padding: '16px'}}>
                        <hr style={{margin: 20}}/>
                    </div>
                    <AppealAuditList data={unchecked}/>
                </div>
                <div style={{marginBottom: "20px"}}>
                    <br/>
                    <Typography variant='h5' align='center'>
                        已审核列表
                    </Typography>
                    <div style={{padding: '16px'}}>
                        <hr style={{margin: 20}}/>
                    </div>
                    <AppealResultList data={checked}/>
                </div>
            </Paper>
        </div>
    )
}