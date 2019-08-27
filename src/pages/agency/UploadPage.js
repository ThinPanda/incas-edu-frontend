import React, {useContext, useEffect} from 'react'
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import UploadForm from "../../components/upload";
import {UploadFileProvider} from "../../hooks/UploadFileContext";
import {GlobalContext} from "../../hooks/GlobalContext";
import {navigate} from "@reach/router";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 10),
    },
    paper: {
        padding: theme.spacing(3, 2),
    },
    avatar: {
        width: 100,
        height: 100,
        marginLeft: 100,
    },
    showData: {
        flexGrow: 1,
        textAlign: "center",
    }
}));

export default function Upload() {

    const { state } = useContext(GlobalContext);

    useEffect(() => {
        if (!state.isLogin){
            window.alert("您好,请先登录!");
            navigate("/login");
            return;
        }
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} component='div' elevation={5} >
                <Typography variant='h4' paragraph align='center'>
                    {/*{state.isLogin && <div>Hello {state.username}!</div>} */}
                    上传资源
                </Typography>
                <Typography>机构用户上传资源</Typography>
                <hr/>
                <UploadFileProvider>
                    <UploadForm/>
                </UploadFileProvider>
            </Paper>
        </div>
    )
}