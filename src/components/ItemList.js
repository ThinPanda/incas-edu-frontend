import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';


const SUCCESS_COLOR = green[300];
const FAILED_COLOR = red[200];
const UNCHECKED_COLOR = grey[500];

const msgColor = {
    0: UNCHECKED_COLOR,
    1: SUCCESS_COLOR,
    2: FAILED_COLOR
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: '90%',
        // display: 'flex',
        display: 'content',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        margin: 'auto',
    },
    gridList: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        // height: 500,
    },
    inline: {
        display: 'inline',
    },
    avatar: {
        width: 75,
        height: 75,
        marginRight: 15,
    },
    data: {
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    msg: {
        display: 'flex',
        padding: '10px',
        // backgroundColor: SUCCESS_COLOR,
        // backgroundColor: FAILED_COLOR,
        // backgroundColor: UNCHERCKED_COLOR,
        color: 'white',
    },
    stateBar: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    }
}));


export default function ItemsList(props) {
    const classes = useStyles();
    const data = props.data;

    return (
        Array.isArray(data) && data.length !== 0 ?
        <div className={classes.root}>
            <div style={{padding: "15px"}}>
                <GridList cellHeight={"auto"} className={classes.gridList} cols={2} spacing={10} >
                    {data.map((value, index) => (
                        <GridListTile key={index} cols={1} component="div">
                            <MyGridItem ifChecked={props.ifChecked} data={value}/>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </div> : <Typography variant="subtitle2" color="textSecondary" align="center">暂没有相关数据</Typography>
    );
}


function MyGridItem(props) {
    const classes = useStyles();
    const data = props.data;

    return (
        <div>
            <ListItem alignItems="flex-start"  className={classes.data}>
                <ListItemAvatar>
                    <Avatar className={classes.avatar} alt="Remy Sharp" src={data.fileImage} />
                </ListItemAvatar>
                <ListItemText
                    primary={data.fileTitle}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {data.fileInitialProvider}
                            </Typography>
                            { " —— " + data.fileDescription}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <div className={classes.msg} style={{backgroundColor: msgColor[props.ifChecked]}}>
                {
                    props.ifChecked === 0 ?
                    <div className={classes.stateBar}>
                        <span style={{flexGrow: 1, textAlign:'center'}}>audit: to be checked</span>
                        <span style={{flexGrow: 1, textAlign:'center'}}>upload time: {data.createTime}</span>
                    </div> :
                    <div className={classes.stateBar}>
                        <span style={{flexGrow: 1, textAlign:'center'}}>audit: {props.ifChecked === 1 ? "pass" : "reject"}</span>
                        <span style={{flexGrow: 1, textAlign:'right'}}>by: {data.adminEmail}</span>
                    </div>
                }
            </div>
        </div>
    )
}
