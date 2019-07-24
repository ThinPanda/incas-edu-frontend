import React, {useContext, useState} from 'react'
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {GlobalContext} from "../../hooks/GlobalContext";


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
    content: {
        padding: '16px',
        margin: '20px',
        width: '30vw'
    }
}));

export default function CentralBank() {

    const classes = useStyles();
    const { state, dispatch } = useContext(GlobalContext);
    const [ recharge, setRecharge ] = useState(false);
    const [ transfer, setTransfer ] = useState(false);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} component='div' elevation={5} >
                <Typography variant='h4' paragraph align='center'>
                    {/*{state.isLogin && <div>Hello {state.username}!</div>} */}
                    查看中央账户！
                </Typography>
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
                </div>
                <SimpleForm/>
            </Paper>
        </div>
    )
}

function SimpleForm() {
    const classes = useStyles();
    return(
        <div>
            <Paper className={classes.content}>
                <div style={{margin: '16px'}}>
                    <Typography variant="h6">中央账户：centralbank@email.com</Typography>
                    <hr/>
                </div>
                <div style={{marginLeft: '16px'}}>
                    <Typography variant="subtitle1" color="textSecondary">账户余额：0.183</Typography>
                    <Typography variant="subtitle1" color="textSecondary">总共发行课程币数量：150</Typography>
                </div>
            </Paper>
        </div>
    )
}