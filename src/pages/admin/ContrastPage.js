import React from 'react'
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


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

export default function Contrast() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} component='div' elevation={5} >
                <br/>
                <Typography variant='h4' align='center'>
                    {/*{state.isLogin && <div>Hello {state.username}!</div>} */}
                    权益分配合约
                </Typography>
                <div style={{padding: '16px'}}>
                    {/*<div style={{display: "flex", alignItems: "center"}}>*/}
                        {/*/!*<Avatar className={classes.avatar} src="https://material-ui.com/static/images/avatar/1.jpg"/>*!/*/}
                        {/*<div style={{flexGrow: 1}}>/!*为了方便布局，加入的空标签*!/</div>*/}
                        {/*<div style={{flexGrow: 4}}>*/}
                            {/*<Typography variant="h5">hello</Typography>*/}
                            {/*<Typography variant="subtitle2" color="textSecondary">September 14, 2016</Typography>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <hr style={{margin: 20}}/>
                </div>
                <ContrastTable/>
            </Paper>
        </div>
    )
}

function ContrastTable(props) {
    return(
        <div style={{display: 'flex'}}>
            <div style={{flexGrow: 1}}>
                <Typography variant='h6'>平台</Typography>
                <Typography variant='body1'>0.03%</Typography>
            </div>
            <div style={{flexGrow: 1}}>
                <Typography variant='h6'>服务提供商</Typography>
                <Typography variant='body1'>99.7%</Typography>
            </div>
        </div>
    )
}