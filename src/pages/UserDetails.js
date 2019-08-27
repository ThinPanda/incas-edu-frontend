import React, {useContext, useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../hooks/GlobalContext";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {getRechargeList, getTransferList, getUserInfo, getWithdrawList} from "../fetch/requestAPI";
import {RechargeList, TransferList, WithdrawList} from "../components/SimpleDataList";
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


export default function Details() {

    const classes = useStyles();
    const { state } = useContext(GlobalContext);
    const [ recharge, setRecharge ] = useState(false);
    const [ rechargeList, setRechargeList ] = useState();
    const [ transfer, setTransfer ] = useState(false);
    const [ transferList, setTransferList ] = useState();
    const [ withdraw, setWithdraw ] = useState(false);
    const [ withdrawList, setWithdrawList ] = useState();
    const [ detail, setDetail ] = useState({
        accountBalance:"",
        address:"",
        age:"",
        bankAccount:"",
        educationLevel:"",
        email:"",
        qq:"12345qq",
        sexual:"",
        legalRepresentative: "",
        registrationNumber: "",
        businessTerm: "",
    });

    useEffect(() => {

        if (!state.isLogin){
            window.alert("您好,请先登录!");
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            let user_type = state.userType === "ORDINARY" ? "user" : ( state.userType === "AGENCY" ? "agency" : "admin");

            const userInfo = await getUserInfo(user_type);
            setDetail(userInfo);
            // console.log(state.userType);
            if ( user_type === "user" ){
                const rechargeList = await getRechargeList();
                const transferList = await getTransferList();
                setRechargeList(rechargeList);
                setTransferList(transferList);
            } else if ( user_type === "agency" ){
                const withdrawList = await getWithdrawList();
                setWithdrawList(withdrawList);
            }
        };
        fetchData();
    }, []);

    const user_type = {
        "ORDINARY": "普通用户",
        "AGENCY": "机构用户",
        "ADMIN": "管理员",
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} component='div' elevation={5} >
                <Typography variant='h4' paragraph align='center'>
                    用户详情页！
                </Typography>
                <div style={{padding: '16px'}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Avatar className={classes.avatar} src="https://material-ui.com/static/images/avatar/1.jpg"/>
                        <div style={{flexGrow: 1}}>{/*为了方便布局，加入的空标签*/}</div>
                        <div style={{flexGrow: 4}}>
                            <Typography variant="h5">hello {user_type[state.userType]} {state.username}</Typography>
                            {
                                state.userType === "ORDINARY" &&
                                <div>
                                    <Typography variant="subtitle2" color="textSecondary">Age: {detail.age ? detail.age : "未设置"}</Typography>
                                    <Typography variant="subtitle2" color="textSecondary">QQ: {detail.qq ? detail.qq : "未设置"}</Typography>
                                    <Typography variant="subtitle2" color="textSecondary">Sexual: {detail.sexual ? detail.sexual : "未设置"}</Typography>
                                </div>
                            }
                            {
                                state.userType === "AGENCY" &&
                                <div>
                                    <Typography variant="subtitle2" color="textSecondary">LegalRepresentative: {detail.legalRepresentative ? detail.legalRepresentative : "未设置"}</Typography>
                                    <Typography variant="subtitle2" color="textSecondary">RegistrationNumber: {detail.registrationNumber ? detail.registrationNumber : "未设置"}</Typography>
                                    <Typography variant="subtitle2" color="textSecondary">BusinessTerm: {detail.businessTerm ? detail.businessTerm : "未设置"}</Typography>
                                </div>
                            }
                            {
                                state.userType === "ADMIN" &&
                                <div>
                                    <Typography variant="subtitle2" color="textSecondary">Age: {detail.age ? detail.age : "未设置"}</Typography>
                                    <Typography variant="subtitle2" color="textSecondary">QQ: {detail.qq ? detail.qq : "未设置"}</Typography>
                                    <Typography variant="subtitle2" color="textSecondary">Sexual: {detail.sexual ? detail.sexual : "未设置"}</Typography>
                                </div>
                            }
                        </div>
                    </div>

                    <div style={{margin: 20}}>
                        <hr/>
                        <Typography variant="h6">账户：{detail.bankAccount}</Typography>
                        <Typography variant="h6">当前余额：{detail.accountBalance}</Typography>
                        <hr/>
                    </div>

                    {
                        state.userType === "ORDINARY" &&
                        <div>
                            <div style={{display: "flex"}}>
                                <div className={classes.showData}>
                                    <Button variant="outlined" color="primary" className={classes.showData} onClick={() => setRecharge(!recharge)}>{
                                        recharge ? '隐藏': '显示'}充值记录
                                    </Button>
                                </div>
                                <div className={classes.showData}>
                                    <Button variant="outlined" color="secondary" className={classes.showData} onClick={() => setTransfer(!transfer)}>
                                        {transfer ? '隐藏': '显示'}转账记录
                                    </Button>
                                </div>
                            </div>
                            <div style={{display: "flex"}}>
                                { recharge && <div className={classes.showData} style={{padding:16}}>充值列表：<RechargeList data={rechargeList}/></div>}
                                { transfer && <div className={classes.showData} style={{padding:16}}>转账列表：<TransferList data={transferList}/></div>}
                            </div>
                        </div>
                    }
                    {
                        state.userType === "AGENCY" &&
                        <div>
                            <div className={classes.showData}>
                                <Button variant="outlined" color="primary" className={classes.showData} onClick={() => setWithdraw(!withdraw)}>{
                                    withdraw ? '隐藏': '显示'}提现记录
                                </Button>
                            </div>
                            <div>
                                { withdraw && <div className={classes.showData} style={{padding:16}}>提现列表：<WithdrawList data={withdrawList}/></div>}
                            </div>
                        </div>
                    }

                </div>
            </Paper>
        </div>
    );
}
