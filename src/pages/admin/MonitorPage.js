import React, {useContext, useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import * as ReactD3 from "react-d3-components";
import { FixedSizeList } from "react-window";
import {navigate} from "@reach/router";
import {
    adminGetAgencyIdList, adminGetBuyOwnershipFreq,
    adminGetBuyReadPriceFreq,
    adminGetPublishFreq,
    adminGetRechargeFreq,
    adminGetTransferFreq,
    adminGetUserIdList,
    adminGetWithdrawFreq,
} from "../../fetch/requestAPI";
import {GlobalContext} from "../../hooks/GlobalContext";
import ListItem from "@material-ui/core/ListItem";


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
    },
    fixedSizeList: {
        border: "1px solid #d9dddd"
    },
    listItemOdd: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    listItemEven: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f8f0"
    },
    barChartItem: {
        margin: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }
}));

export default function Monitor() {

    const { state } = useContext(GlobalContext);
    const classes = useStyles();

    const initialData = [{
        label: "label",
        values: [{x: "a", y: 0}]
    }];

    const [candidate, setCandidate] = useState(null);
    const [curUser, setCurUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [agencies, setAgencies] = useState([]);

    const [recharge, setRecharge] = useState(initialData);
    const [transfer, setTransfer] = useState(initialData);
    const [withdraw, setWithdraw] = useState(initialData);
    const [publish, setPublish] = useState(initialData);
    const [buyReadPrice, setBuyReadPrice] = useState(initialData);
    const [buyOwnerShip, setBuyOwnerShip] = useState(initialData);


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {

        if (!state.isLogin){
            window.alert("您好,请先登录!");
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            let userIds = await adminGetUserIdList();
            let agencyIds = await adminGetAgencyIdList();
            setUsers(userIds);
            setAgencies(agencyIds);
        };
        fetchData();
    }, []);


    function formatData(data, label){
        let res = {
            label: label,
            values: [
                {x: "January", y: 0},
                {x: "February", y: 0},
                {x: "March", y: 0},
                {x: "April", y: 0},
                {x: "May", y: 0},
                {x: "June", y: 0},
                {x: "July", y: 0},
                {x: "August", y: 0},
                {x: "September", y: 0},
                {x: "October", y: 0},
                {x: "November", y: 0},
                {x: "December", y: 0}
            ]
        };
        for (let item of data){
            res.values[item.month - 1].y = item.count
        }
        // console.log("format data",res );
        return res;
    };

    async function selectUser(email, type){
        setCandidate(type);
        setCurUser(email);
        // let withdrawFreq = await adminGetWithdrawFreq(email);
        // setWithdraw(formatData(withdrawFreq, type));

        switch (type) {
            case "user":
                let rechargeFreq = await adminGetRechargeFreq(email);
                let transferFreq = await adminGetTransferFreq(email);
                let buyReadPriceFreq = await adminGetBuyReadPriceFreq(email);

                console.log(rechargeFreq);

                setRecharge(formatData(rechargeFreq, type));
                setTransfer(formatData(transferFreq, type));
                setBuyReadPrice(formatData(buyReadPriceFreq, type));
                break;
            case "agency":
                let withdrawFreq = await adminGetWithdrawFreq(email);
                let publishFreq = await adminGetPublishFreq(email);
                let buyOwnerShipFreq = await adminGetBuyOwnershipFreq(email);

                setWithdraw(formatData(withdrawFreq, type));
                setPublish(formatData(publishFreq, type));
                setBuyOwnerShip(formatData(buyOwnerShipFreq, type));
                break;
        }
    }

    const BarChart = ReactD3.BarChart;
    const Row = props => {
        const { data, index, style } = props;
        return (
            <ListItem button onClick={() => selectUser(data.emails[index], data.type)} className={index % 2 ? classes.listItemOdd : classes.listItemEven} style={style}>
                {data.emails[index]}
            </ListItem>
        )
    };


    return (
        <div>
            <Paper className={classes.paper} component='div' elevation={5} >
                <br/>
                <Typography variant='h4' align='center'>
                    数据监测界面
                </Typography>
                <div style={{padding: '16px'}}>
                    <hr style={{margin: 20}}/>
                </div>
                <Typography variant="subtitle2" color="textSecondary" align="center">
                    管理员监测在交易过程中出现的异常行为，将异常行为记录在区块链存证
                </Typography>
            </Paper>
            <Paper className={classes.paper} component='div' elevation={5} style={{marginTop: "20px"}}>
                <Typography variant='body1' align='center'>
                    用户消费行为统计
                </Typography>
                {/*<div style={{padding: '16px'}}>*/}
                    {/*<hr style={{margin: 20}}/>*/}
                {/*</div>*/}
                <hr/>
                <Typography variant="subtitle2" color="textSecondary" align="center" style={{margin: 20}}>
                    从上方列表选择用户，查看消费数据 {curUser ? `—————— 当前选择用户：${curUser}` : ""}
                </Typography>

                <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                    <div>
                        <Typography variant='body2' align='center'>
                            普通用户列表
                        </Typography>
                        <FixedSizeList
                            className={classes.fixedSizeList}
                            height={200}
                            itemCount={users.length}
                            itemSize={35}
                            width={300}
                            itemData={{emails: users, type: "user"}}
                            userType="user"
                        >
                            {Row}
                        </FixedSizeList>
                    </div>
                    <div>
                        <Typography variant='body2' align='center'>
                            机构用户列表
                        </Typography>
                        <FixedSizeList
                            className={classes.fixedSizeList}
                            height={200}
                            itemCount={agencies.length}
                            itemSize={35}
                            width={300}
                            itemData={{emails: agencies, type: "agency"}}
                            userType="agency"
                        >
                            {Row}
                        </FixedSizeList>
                    </div>

                </div>
                <hr style={{margin: "30px"}}/>

                {
                    candidate === "user" &&
                    <div>
                        <div className={classes.barChartItem}>
                            <Typography variant='body2' align='left'>
                                普通用户今年每月充值次数统计
                            </Typography>
                            <BarChart
                                data={recharge}
                                width={1000}
                                height={300}
                                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                            />
                        </div>
                        <div className={classes.barChartItem}>
                            <Typography variant='body2' align='left'>
                                普通用户今年每月转账次数统计
                            </Typography>
                            <BarChart
                                data={transfer}
                                width={1000}
                                height={300}
                                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                            />
                        </div>
                        <div className={classes.barChartItem}>
                            <Typography variant='body2' align='left'>
                                普通用户今年每月购买资源阅读权次数统计
                            </Typography>
                            <BarChart
                                data={buyReadPrice}
                                width={1000}
                                height={300}
                                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                            />
                        </div>
                    </div>
                }

                {
                    candidate === "agency" &&
                    <div>
                        {/* 机构用户没有转账这个操作 */}
                        {/*<div className={classes.barChartItem}>*/}
                            {/*<Typography variant='body2' align='left'>*/}
                                {/*机构用户今年每月转账次数统计*/}
                            {/*</Typography>*/}
                            {/*<BarChart*/}
                                {/*data={transfer}*/}
                                {/*width={1000}*/}
                                {/*height={300}*/}
                                {/*margin={{top: 10, bottom: 50, left: 50, right: 10}}*/}
                            {/*/>*/}
                        {/*</div>*/}
                        <div className={classes.barChartItem}>
                            <Typography variant='body2' align='left'>
                                机构用户今年每月提现次数统计
                            </Typography>
                            <BarChart
                                data={withdraw}
                                width={1000}
                                height={300}
                                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                            />
                        </div>
                        <div className={classes.barChartItem}>
                            <Typography variant='body2' align='left'>
                                机构用户今年每月发布资源次数统计
                            </Typography>
                            <BarChart
                                data={publish}
                                width={1000}
                                height={300}
                                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                            />
                        </div>
                        <div className={classes.barChartItem}>
                            <Typography variant='body2' align='left'>
                                机构用户今年每月购买资源所有权次数统计
                            </Typography>
                            <BarChart
                                data={buyOwnerShip}
                                width={1000}
                                height={300}
                                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                            />
                        </div>
                    </div>

                }


                {/*<div>*/}
                    {/*<BarChart*/}
                        {/*data={data}*/}
                        {/*width={300}*/}
                        {/*height={300}*/}
                        {/*margin={{top: 10, bottom: 50, left: 50, right: 10}}*/}
                    {/*/>*/}
                {/*</div>*/}

                {/*{candidate === "user" ? <div>*/}
                    {/*<BarChart*/}
                        {/*data={recharge}*/}
                        {/*width={300}*/}
                        {/*height={300}*/}
                        {/*margin={{top: 10, bottom: 50, left: 50, right: 10}}*/}
                    {/*/>*/}

                {/*</div> : <div>*/}
                    {/*<BarChart*/}
                        {/*data={withdraw}*/}
                        {/*width={300}*/}
                        {/*height={300}*/}
                        {/*margin={{top: 10, bottom: 50, left: 50, right: 10}}*/}
                    {/*/>*/}
                {/*</div>}*/}

                {/*<Typography variant='body2' align='left'>*/}
                    {/*机构用户消费行为统计*/}
                {/*</Typography>*/}
                {/*<div style={{display: "flex", alignItems: "center"}}>*/}
                    {/*<FixedSizeList*/}
                        {/*className={classes.fixedSizeList}*/}
                        {/*height={150}*/}
                        {/*itemCount={users.length}*/}
                        {/*itemSize={35}*/}
                        {/*width={300}*/}
                        {/*itemData={users}*/}
                    {/*>*/}
                        {/*{Row}*/}
                    {/*</FixedSizeList>*/}
                    {/*<BarChart*/}
                        {/*data={data}*/}
                        {/*width={300}*/}
                        {/*height={300}*/}
                        {/*margin={{top: 10, bottom: 50, left: 50, right: 10}}*/}
                    {/*/>*/}
                {/*</div>*/}
            </Paper>
        </div>
    )
}