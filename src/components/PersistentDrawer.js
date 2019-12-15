import React, {useContext} from 'react';
import clsx from 'clsx';
import {navigate} from "@reach/router";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import Switch from "@material-ui/core/Switch/Switch";
import HomeIcon from "@material-ui/icons/Home";
import {GlobalContext} from "../hooks/GlobalContext";
import ZjuImg from "../assets/zju.png"


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    loginButton: {
        // marginLeft: '90vh',
        // justifyContent:
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        // justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    grow: {
        flexGrow: 1,
    },
}));


export default function PersistentDrawerLeft(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = React.useState(true);

    const { state, dispatch } = useContext(GlobalContext);

    function handleChange(event) {
        setAuth(event.target.checked);
        if (auth) {
            dispatch({ operation: "login", type: "reset" });
            dispatch({ operation: "username", type: "reset" });
            dispatch({ operation: "userType", type: "reset" });
        } else {
            navigate('/login',3000)
        }
    }

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        数字教育资源平台
                    </Typography>

                    {/*<div>注销 | 切换用户</div>*/}

                    <div className={classes.grow} />
                    <FormGroup className={classes.loginButton}>
                        <FormControlLabel
                            control={<Switch checked={auth} onChange={handleChange} aria-label="LoginSwitch"/>}
                            label={auth ? 'Logout' : 'Login'}
                        />
                    </FormGroup>
                    <IconButton
                        aria-label="Account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => navigate('/')}
                    >
                        <HomeIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    {/* 这里应该有个校徽 */}
                    <img src={ZjuImg} style={{width: "40px", height: "40px"}}/>
                    <Typography align="center" style={{flexGrow: 2}}>ZJU_Incas</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem onClick={() => navigate('/')} button key={'首页'}>
                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                        <ListItemText primary={'首页'}/>
                    </ListItem>
                    <ListItem onClick={() => navigate('/detail')} button key={'个人主页'}>
                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                        <ListItemText primary={'个人主页'}/>
                    </ListItem>

                    <ListItem onClick={() => navigate('/resource')} button key={'资源中心'}>
                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                        <ListItemText primary={'资源中心'}/>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {
                        state.userType === "ORDINARY" &&
                            <div>
                                <List>
                                    <ListItem onClick={() => navigate('/myResource')} button key={'我的资源'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'我的资源'}/>
                                    </ListItem>
                                    <ListItem onClick={() => navigate('/recharge')} button key={'充值'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'充值'}/>
                                    </ListItem>
                                    <ListItem onClick={() => navigate('/transfer')} button key={'转账'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'转账'}/>
                                    </ListItem>
                                </List>
                                <Divider />
                            </div>
                    }
                    {
                        state.userType === "AGENCY" &&
                            <div>
                                <List>
                                    <ListItem onClick={() => navigate('/myResource')} button key={'已购资源'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'已购资源'}/>
                                    </ListItem>
                                    <ListItem onClick={() => navigate('/upload')} button key={'上传'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'上传'}/>
                                    </ListItem>
                                    <ListItem onClick={() => navigate('/myUpload')} button key={'我的资源'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'我的资源'}/>
                                    </ListItem>
                                    <ListItem onClick={() => navigate('/withdraw')} button key={'提现'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'提现'}/>
                                    </ListItem>
                                    <ListItem onClick={() => navigate('/appeal')} button key={'侵权申诉'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'侵权申诉'}/>
                                    </ListItem>
                                </List>
                                <Divider />
                            </div>
                    }
                    {
                        state.userType === "ADMIN" &&
                            <div>
                                <List>
                                    <ListItem onClick={() => navigate('/centralBank')} button key={'查看中央账户'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'查看中央账户'}/>
                                    </ListItem>
                                    <ListItem onClick={() => navigate('/contrast')} button key={'权益分配合约'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'权益分配合约'}/>
                                    </ListItem>
                                </List>
                                <Divider/>
                                <List>
                                    <ListItem onClick={() => navigate('/auditTrading')} button key={'交易审核'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'交易审核'}/>
                                    </ListItem>
                                    <ListItem onClick={() => navigate('/auditResource')} button key={'资源审核'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'资源审核'}/>
                                    </ListItem>
                                    <ListItem onClick={() => navigate('/auditAppeal')} button key={'侵权申诉审核'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'侵权申诉审核'}/>
                                    </ListItem>
                                </List>
                                <Divider/>
                                <List>
                                    <ListItem onClick={() => navigate('/monitor')} button key={'数据监测'}>
                                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                                        <ListItemText primary={'数据监测'}/>
                                    </ListItem>
                                </List>
                                <Divider/>
                            </div>
                    }
                </List>
                <List>
                    <ListItem onClick={() => navigate('/modifyInfo')} button key={'个人设置'}>
                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                        <ListItemText primary={'我的设置'}/>
                    </ListItem>
                </List>
            </Drawer>

            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
        </div>
    );
}

