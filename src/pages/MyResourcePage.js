import React, {useContext, useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import ItemCard from "../components/ItemCard";
import { GlobalContext } from "../hooks/GlobalContext";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {getMyResourceList} from "../fetch/requestAPI";
import {navigate} from "@reach/router";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2,3),
    },
    header: {
        padding: "inherit",
        marginBottom: "20px"
    },
    content: {
        display: 'flex',
    }
}));


export default function MyResource() {
    const classes = useStyles();
    const { state } = useContext(GlobalContext);

    const [myResource, setMyResource] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (!state.isLogin){
            window.alert("您好,请先登录!");
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            let user_type = state.userType === "ORDINARY" ? "user" : "agency";
            setIsLoading(true);
            const list = await getMyResourceList(user_type);
            // console.log(list);
            setMyResource(list);
            setIsLoading(false)
        };
        fetchData();
    }, []);

    return(
        <div className={classes.root}>
            <Paper className={classes.header}>
                <Typography variant='h5' align='center'>
                    已购买资源页面!
                </Typography>
            </Paper>
            <div>
                <Grid container spacing={3}>
                    {
                        isLoading ? (
                            <Paper>
                                Loading...
                            </Paper>
                        ) : (
                            myResource.length === 0 ? (
                                <Typography variant="subtitle1">
                                    您还未购买任何资源...
                                </Typography>
                            ) : (
                                    myResource.map((value, index) => {
                                        return (
                                            <Grid item xs={3} key={index}>
                                                <ItemCard value={value} key={index}/>
                                            </Grid>
                                        )
                                    })
                                )
                            )
                    }
                </Grid>
            </div>
        </div>
    )
}
