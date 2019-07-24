import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 650,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    avatar: {
        width: 50,
        height: 50,
    },
    data: {
        marginLeft: '100px',
        padding: '10px',
    }
}));

export default function ItemsList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {props.data.map((value, index) => {
                return (
                    <div className={classes.data}>
                        <ListItem alignItems="flex-start">
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
                        <Divider variant="inset" component="li" />
                    </div>
                )
            })}
        </List>
    );
}