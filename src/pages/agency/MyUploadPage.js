import React, {useContext} from "react";
import ItemsList from "../../components/ItemList";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import { GlobalContext } from "../../hooks/GlobalContext";
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

export default function MyUpload() {
    const classes = useStyles();
    const { state, dispatch } = useContext(GlobalContext);

    const myUpload = [ 1, 2 ,3 ,4, 5, 6, 7, 8, 9, 10, 11, 12 ];

    return(
        <div className={classes.root}>
            <Paper className={classes.header}>
                <Typography variant='h5' align='center'>
                    {/*{state.isLogin && <div>Hello {state.username}!</div>} */}
                    已上传资源界面
                </Typography>
            </Paper>
            <Paper>
                <ItemsList data={myUpload}/>
            </Paper>
        </div>
    )
}
