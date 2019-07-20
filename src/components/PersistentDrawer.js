import React from 'react';
import clsx from 'clsx';
import {Link, navigate} from "@reach/router";
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
        justifyContent: 'flex-end',
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

function MyContent() {

}


export default function PersistentDrawerLeft(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = React.useState(true);

    function handleChange(event) {
        setAuth(event.target.checked);
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
                            control={<Switch checked={auth} onChange={handleChange} aria-label="LoginSwitch" />}
                            label={auth ? 'Logout' : 'Login'}
                        />
                    </FormGroup>
                    <IconButton
                        aria-label="Account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => navigate('/index')}
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
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                        {/*<ListItem button key={text}>*/}
                            {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                            {/*<ListItemText primary={text} />*/}
                        {/*</ListItem>*/}
                    {/*))}*/}
                    <ListItem onClick={() => navigate('/index')} button key={'首页'}>
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

                    <ListItem onClick={() => navigate('/myResource')} button key={'我的资源'}>
                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                        <ListItemText primary={'我的资源'}/>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {/*{['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
                        {/*<ListItem button key={text}>*/}
                            {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                            {/*<ListItemText primary={text} />*/}
                        {/*</ListItem>*/}
                    {/*))}*/}
                </List>
            </Drawer>

            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {props.children}
                {/*<Typography paragraph>*/}
                    {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt*/}
                    {/*ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum*/}
                    {/*facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit*/}
                    {/*gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id*/}
                    {/*donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit*/}
                    {/*adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.*/}
                    {/*Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis*/}
                    {/*imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget*/}
                    {/*arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem*/}
                    {/*donec massa sapien faucibus et molestie ac.*/}
                {/*</Typography>*/}
                {/*<Typography paragraph>*/}
                    {/*Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla*/}
                    {/*facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac*/}
                    {/*tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat*/}
                    {/*consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed*/}
                    {/*vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In*/}
                    {/*hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et*/}
                    {/*tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin*/}
                    {/*nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas*/}
                    {/*accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.*/}
                {/*</Typography>*/}
            </main>
        </div>
    );
}

