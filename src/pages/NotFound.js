import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NotFoundImg from "../assets/page_not_found.svg"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    content: {
        paddingTop: 100,
        textAlign: 'center'
    },
    image: {
        marginTop: 50,
        display: 'inline-block',
        maxWidth: '100%',
        width: 560
    }
}));

const NotFound = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                container
                justify="center"
                spacing={4}
            >
                <Grid
                    item
                    lg={8}
                    xs={12}
                >
                    <div className={classes.content}>
                        <Typography variant="h4" style={{fontWeight: 500}}>
                            404: The page you are looking for isn’t here
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            You either tried some shady route or you came here by mistake.
                            Whichever it is, try using the navigation
                        </Typography>
                        <img
                            alt="Under development"
                            className={classes.image}
                            src={NotFoundImg}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default NotFound;
