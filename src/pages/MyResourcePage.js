import React from "react";
import ItemsList from "../components/ItemList";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import ItemCard from "../components/ItemCard";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3,3),
    },
}));

export default function MyResource() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Typography variant='h5' align='center' paragraph>
                我的资源页!
            </Typography>
            <ItemsList/>
        </div>
    )
}
