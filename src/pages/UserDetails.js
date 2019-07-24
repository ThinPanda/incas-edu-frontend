import React, {useContext, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import ItemCard from "../components/ItemCard";
import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../hooks/GlobalContext";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import SimpleDataList from "../components/SimpleDataList";


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
    const { state, dispatch } = useContext(GlobalContext);
    const [ recharge, setRecharge ] = useState(false);
    const [ transfer, setTransfer ] = useState(false);

    const data = [1, 2, 3, 4, 5];

    // function handleRechargeList() {
    //     setRecharge(true);
    // }
    //
    // function handleTransferList() {
    //     setTransfer(!transfer);
    // }


    return (
        <div className={classes.root}>
            <Paper className={classes.paper} component='div' elevation={5} >
                <Typography variant='h4' paragraph align='center'>
                    {/*{state.isLogin && <div>Hello {state.username}!</div>} */}
                    用户详情页！
                </Typography>
                {/*<Typography variant='h5' paragraph >*/}
                    {/*这是一个 paper 测试*/}
                {/*</Typography>*/}
                {/*<ItemCard/>*/}
                {/*<br/>*/}
                {/*src="https://material-ui.com/static/images/avatar/1.jpg"*/}
                {/*<Card style={{boxShadow:'none'}}>*/}
                    {/*<CardHeader*/}
                        {/*avatar={*/}
                            {/*<Avatar aria-label="Recipe" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.avatar}/>*/}
                        {/*}*/}
                        {/*// action={*/}
                        {/*//     <IconButton aria-label="Settings">*/}
                        {/*//         <MoreVertIcon />*/}
                        {/*//     </IconButton>*/}
                        {/*// }*/}
                        {/*title={*/}
                            {/*<Typography variant="h5">hello {state.username}</Typography>*/}
                        {/*}*/}
                        {/*subheader="September 14, 2016"*/}
                    {/*/>*/}
                    {/*<hr/>*/}
                    {/*<Typography variant="h6">余额：100</Typography>*/}
                    {/*<Button variant="outlined" color="primary">显示充值记录</Button>*/}
                    {/*<Button variant="outlined" color="secondary">显示转账记录</Button>*/}
                {/*</Card>*/}
                {/*<hr/>*/}
                <div style={{padding: '16px'}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Avatar className={classes.avatar} src="https://material-ui.com/static/images/avatar/1.jpg"/>
                        <div style={{flexGrow: 1}}>{/*为了方便布局，加入的空标签*/}</div>
                        <div style={{flexGrow: 4}}>
                            <Typography variant="h5">{state.userType} hello {state.username}</Typography>
                            <Typography variant="subtitle2" color="textSecondary">September 14, 2016</Typography>
                        </div>
                    </div>
                    <hr style={{margin: 20}}/>
                    <Typography variant="h6">当前余额：100</Typography>
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
                        <div className={classes.showData}>{ recharge && <div style={{padding:16}}>充值列表：<SimpleDataList/></div>}</div>
                        <div className={classes.showData}>{ transfer && <div style={{padding:16}}>转账列表：<SimpleDataList/></div>}</div>
                    </div>
                </div>
            </Paper>
        </div>
    );
}
