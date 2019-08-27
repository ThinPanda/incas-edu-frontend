import React, {useContext} from "react";
import Button from '@material-ui/core/Button';
import LayoutCenter from "../components/LayoutCenter";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {navigate} from "@reach/router";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/ArrowDownward';
import AccountIcon from '@material-ui/icons/AccountCircle';
import {GlobalContext} from "../hooks/GlobalContext";


const useStyles = makeStyles(theme => ({
    background: {
        // background: 'linear-gradient(45deg, #4caf50 30%, #00b0ff 90%)',
        // background: 'linear-gradient(to left bottom, hsl(118, 100%, 85%) 0%, hsl(168, 100%, 85%) 100%)',
        height: '200vh'
    },
    page1: {
        // background: 'linear-gradient(to left bottom, hsl(118, 100%, 85%) 0%, hsl(168, 100%, 85%) 100%)',
        background: 'linear-gradient(to left bottom, hsl(216, 100%, 85%) 0%, hsl(196, 100%, 85%) 100%)',
        height: '100vh'
    },
    page2: {
        background: 'linear-gradient(to left bottom, hsl(124, 100%, 85%) 0%,hsl(153, 100%, 85%) 100%)',
        height: '100vh'
    },
    login: {
        position: 'fixed',
        marginTop: '20px',
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%"
    },
    title: {
    },
    sec: {
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}));

export default function HomePage(props) {

    const classes = useStyles();
    const { state } = useContext(GlobalContext);

    const scroll = (e)=> {
        console.log(e.target);
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    };

    return(
        <div className={classes.background}>
            {
                state.isLogin ? (
                    <div className={classes.login}>
                        <AccountIcon/>
                        <Button color="primary" onClick={() => navigate('/detail')} style={{paddingRight: "30px"}}>back</Button>
                    </div>
                ) : (
                    <div className={classes.login}>
                        <Button color="primary" onClick={() => navigate('/login')}>登录</Button>|
                        <Button color="primary" onClick={() => navigate('/register')} style={{paddingRight: "30px"}}>注册</Button>
                    </div>
                )
            }

            <section className={classes.page1} onClick={scroll}>
                <LayoutCenter>
                    <div style={{flexGrow: 2}}></div>
                    <Typography variant="h2" style={{flexGrow: 1}}>
                        币铸信任，链铸未来<br/>
                    </Typography>
                    {/*<div style={{flexGrow: 1}}></div>*/}
                    <Typography variant="subtitle1" style={{flexGrow: 3}}>
                        基于区块链的数字教育平台，可信的数字资源版权，资源确权与侵权追踪
                    </Typography>
                </LayoutCenter>
                <Fab color="primary" aria-label="Add" onClick={scroll} style={{position: 'absolute', right: '30px', bottom: '30px'}}>
                    <AddIcon />
                </Fab>
            </section>
            <section className={classes.page2}>
                <div className={classes.sec}>
                    <Typography>
                        数字资源版权保护：数字资源版权通过审核后存储在区块链上，全网唯一
                    </Typography>
                    <Typography>
                        数字资源侵权追踪：盗版资源溯源，根据交易记录查找
                    </Typography>
                </div>
            </section>
        </div>
    )
}
