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
import CustomizedSnackbar from "../components/CustomizedSnackbar";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 10),
    },
    paper: {
        padding: theme.spacing(3, 2),
    },
    avatar: {
        width: 150,
        height: 150,
        marginLeft: 100,
        // marginRight: 50
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
            <CustomizedSnackbar/>
            <Paper className={classes.paper} component='div' elevation={5} >
                <Typography variant='h4' paragraph align='center'>
                    用户详情页！
                </Typography>
                <div style={{padding: '16px'}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        {/*<Avatar className={classes.avatar} src="https://material-ui.com/static/images/avatar/1.jpg"/>*/}
                        <Avatar className={classes.avatar} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAH0AfQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiq819bW+fNlVcetYOp+MLKz4hkEhHpWtOjOo7RRjVxFKkrzZ02cUxpol+9Io+przC7+I9zIWSOLC+uKwL3xJfXmcSumfSu+nlVaXxaHl1c7oR+DU9jutXs7VctMh9gaxLjxvp9ucHmvJGu7pvvXDn6moi7ucFiSa7YZRTXxO551XPar+BWPUbj4j2UTgKmRSD4lWJ6QMT7Vw+l+Gr3UplDRERn+KvQNL8BWdnteTa7dSDWVejgqKtLVm+GxGY4jWOi9C/pHiqPVn2pbunuRXRDkVXgsra3UCKFEx6CrFePVlByvBWR71GNSMbVHdhRSEgDJ6VE91DH96QCoSb2NW0tyaiqn9p2Zbb5659KnW4if7rg03GS3QlOL2ZJRSAgjIpakoKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA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90/SgDxjxfIjapIioFwe1c9W74s/5DE31rCr7HDK1KJ+f4t3ry9Qooorc5gooooAKKKKACiiigAooooAKKKKAJIZ5baQPFIUIOeK6/SPH1xaIsMq7x6muMorGrQp1VaaOihiatB3pux7Bb+ItI1WLbd+WpI6ms3UPCWi6lmWC6VfYGvMMH+8R+NXINTurYYSRsfWuJZfKm70ZtHovNY1Vy14JnQXXg1o8/Z2MgHesWXQNTjkKrbMR64qzB4r1G3XapyPepf+Ey1P0X8q3isVHezOebwc9VdGTLp15B/rYWX61XZGQ4YYNaV3r95e/wCtA/AVnySNK25utdEHNr30cdRU0/cYyiiitDIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACgf6xPrRQPvp9aBo9n8JK40xNzEjHFdFXM+Dpmk01Q3QCumr47E/xZH32DadCNuwUUUVgdQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUjfdP0paRvun6UAeKeLP+QxN9awq3/Fsbpq0rMMAnisCvssP/AAon59i/48vUKKKK2OcKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAo/iX60UD/WJ9aAR654HR1sMt0I4rra57wls/stNp5xzXQ18finetJn3+Cjy0IoKKKK5zqCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACg9DRRQB5R49geO53sOD0rjR0r0X4lwlYYpB0NedDpX1mAlzYeLPhs0hyYqSCiiiuw88KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAopMj1pQGPQZoAKKd5UuM7DimkEdRigdgopMj1paBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABSoMzRj1YUlX9GtfteoInowqZS5YtsuEXKSij2XQLSO20qAoOWXJrVqvYp5dlEnouKsV8ZUlzTbZ+hUoqMEkFFFFQaBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQByPju0NzpwIGdoryQjDsvoa971a3W402dWGTsOK8JuomhvJlYEYc19DlNS9Nw7Hyme0eWqqnciooor1zwQooooA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FABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k="/>
                        <div style={{flexGrow: 1}}>{/*为了方便布局，加入的空标签*/}</div>
                        <div style={{flexGrow: 4}}>
                            <Typography variant="h5">Welcome {user_type[state.userType]} {state.username}</Typography>
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
