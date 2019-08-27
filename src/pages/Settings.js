import React, {useContext} from 'react';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../hooks/GlobalContext";
import Avatar from "@material-ui/core/Avatar";


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


export default function Settings() {

    const classes = useStyles();
    const { state } = useContext(GlobalContext);
    // const [ recharge, setRecharge ] = useState(false);
    // const [ transfer, setTransfer ] = useState(false);

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
                    个人设置页！
                </Typography>

                <div style={{padding: '16px'}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Avatar className={classes.avatar} src="https://material-ui.com/static/images/avatar/1.jpg"/>
                        <div style={{flexGrow: 1}}>{/*为了方便布局，加入的空标签*/}</div>
                        <div style={{flexGrow: 4}}>
                            <Typography variant="h5">hello {state.username}</Typography>
                            <Typography variant="subtitle2" color="textSecondary">September 14, 2016</Typography>
                        </div>
                    </div>
                    <hr style={{margin: 20}}/>
                    <Typography variant="h6">接下来显示的是详细信息</Typography>
                </div>
            </Paper>
        </div>
    );
}
