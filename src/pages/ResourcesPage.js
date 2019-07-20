import React from "react";
import ItemCard from "../components/ItemCard";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3,3),
    },
}));

export default function Resources() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Typography variant='h5' align='center' paragraph>
                资源详情页!
            </Typography>
            <ItemCard/>
        </div>
    )
}