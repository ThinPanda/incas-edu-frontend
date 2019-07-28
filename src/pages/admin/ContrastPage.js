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
    child: {
        display: 'flex',
        padding: '16px',
        margin: '20px',
        textAlign: 'center'
    },
    table: {
        borderStyle: 'solid',
        borderWidth: '20px',
        borderColor: 'rgba(0,0,0,0.24)',
        flexGrow: 1
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
                    <hr style={{margin: 20}}/>
                </div>
                <ContrastTable/>
            </Paper>
        </div>
    )
}

function ContrastTable(props) {

    const classes = useStyles();

    return(
        <div className={classes.child}>
            <div className={classes.table}>
                <Typography variant='h6'>平台</Typography>
                <hr/>
                <Typography variant='body1'>0.03%</Typography>
            </div>
            <div className={classes.table}>
                <Typography variant='h6'>服务提供商</Typography>
                <hr/>
                <Typography variant='body1'>99.7%</Typography>
            </div>
        </div>
    )
}