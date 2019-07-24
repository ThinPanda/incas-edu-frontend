import React, {useContext} from "react";
import ItemsList from "../components/ItemList";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import ItemCard from "../components/ItemCard";
import Counter from "../components/Counter";
import { GlobalContext } from "../hooks/GlobalContext";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2,3),
    },
    header: {
        padding: "inherit",
        marginBottom: "20px"
    },
}));

export default function MyResource() {
    const classes = useStyles();
    const { state, dispatch } = useContext(GlobalContext);

    const myResource = [ 1, 2 ,3 ,4, 5, 6 ];

    return(
        <div className={classes.root}>
            <Paper className={classes.header}>
                <Typography variant='h5' align='center'>
                    {/*{state.isLogin && <div>Hello {state.username}!</div>} */}
                    已购资源页!
                </Typography>
            </Paper>
            <Paper>
                <ItemsList data={myResource}/>
            </Paper>
            {/*<br/>*/}
            {/*<Counter/>*/}
        </div>
    )
}
