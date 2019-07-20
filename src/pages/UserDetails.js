import React from 'react';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import ItemCard from "../components/ItemCard";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 10),
    },
    paper: {
        padding: theme.spacing(3, 2),
    },
}));


export default function Details() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} component='div' elevation={5} >
                <Typography variant='h4' paragraph align='center'>
                    用户详情页！
                </Typography>
                <Typography variant='h5' paragraph >
                    这是一个 paper 测试
                </Typography>
                <ItemCard/>
            </Paper>
        </div>
    );
}
