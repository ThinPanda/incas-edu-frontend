import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 300,
        margin: 'auto'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


export default function ItemCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    const data = props.value;

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <Tooltip title="Download Now">
                        <IconButton aria-label="Settings">
                            {/*<MoreVertIcon/>*/}
                            <GetAppIcon/>
                        </IconButton>
                    </Tooltip>
                }
                title={data.fileTitle}
                subheader={new Date(data.createTime).toLocaleDateString()}
            />
            <CardMedia
                className={classes.media}
                image={data.fileImage}
                title={data.id}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {data.fileKeyWord}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="Share">
                    <ShareIcon/>
                </IconButton>
                <Tooltip title="Show More Info">
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </Tooltip>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph color="textSecondary">
                        提供者：{data.fileInitialProvider}
                    </Typography>
                    <Typography paragraph>
                        资源简介：<br/>
                        {data.fileDescription}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
