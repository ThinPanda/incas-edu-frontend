import React, {useContext} from "react";
import Paper from "@material-ui/core/Paper";
import ItemCard from "../components/ItemCard";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../hooks/GlobalContext";
import ResourceCard from "../components/ResourceCard";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2,3),
    },
    header: {
        padding: "inherit",
        marginBottom: "20px"
    },
    content: {
        // width: "60vw",
        flexGrow: 3,
    },
    details: {
        // width: "30vw"
        flexGrow: 2,
    }
}));

export default function Resources() {
    const classes = useStyles();
    const { state, dispatch } = useContext(GlobalContext);

    const resourceData = [ 1, 2, 3, 4, 5, 6 ];

    return(
        <div className={classes.root}>
            <Paper className={classes.header}>
                <Typography variant='h5' align='center'>
                    {/*{state.isLogin && <div>Hello {state.username}!</div>} */}
                    资源中心页!
                </Typography>
            </Paper>
            <div style={{display: "flex"}}>
                <Paper className={classes.content} style={{marginRight: "40px"}}>
                    {resourceData.map((value, index) => {
                        return <ResourceCard style={{padding: "30px"}}/>
                    })}
                    {/*<ItemCard/>*/}
                </Paper>
                <Paper className={classes.details}>
                    资源详情
                </Paper>
            </div>
        </div>
    )
}