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
const UNCHERCKED_COLOR = grey[500];

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: '90%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        margin: 'auto',
    },
    gridList: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        height: 500,
    },
    inline: {
        display: 'inline',
    },
    avatar: {
        width: 50,
        height: 50,
    },
    data: {
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    msg: {
        display: 'flex',
        padding: '10px',
        backgroundColor: SUCCESS_COLOR,
        // backgroundColor: FAILED_COLOR,
        // backgroundColor: UNCHERCKED_COLOR,
        color: 'white',
    },
}));


export default function ItemsList(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div style={{padding: "30px"}}>
                <GridList cellHeight={"auto"} className={classes.gridList} cols={2} spacing={10} >
                    {props.data.map((value, index) => (
                        <GridListTile key={index} cols={1}>
                            <MyGridItem/>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </div>
    );
}


function MyGridItem() {
    const classes = useStyles();

    return (
        <div>
            <ListItem alignItems="flex-start"  className={classes.data}>
                <ListItemAvatar>
                    <Avatar className={classes.avatar} alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <div className={classes.msg}>
                <span style={{flexGrow: 1, textAlign:'center'}}>audit: pass</span>
                <span style={{flexGrow: 1, textAlign:'right'}}>
                    by: panda
                </span>
            </div>
        </div>
    )
}
