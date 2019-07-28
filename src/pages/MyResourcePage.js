import React, {useContext} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import ItemCard from "../components/ItemCard";
import { GlobalContext } from "../hooks/GlobalContext";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";


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
    const { state, dispatch } = useContext(GlobalContext);

    const myResource = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];

    return(
        <div className={classes.root}>
            <Paper className={classes.header}>
                <Typography variant='h5' align='center'>
                    {/*{state.isLogin && <div>Hello {state.username}!</div>} */}
                    已购买资源页面!
                </Typography>
            </Paper>
            <div>
                <Grid container spacing={3}>
                    {myResource.map((value, index) => {
                        return (
                            <Grid item xs={3}>
                                <ItemCard/>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </div>
    )
}
