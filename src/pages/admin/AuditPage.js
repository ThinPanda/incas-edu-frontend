import React from 'react'
import {makeStyles} from "@material-ui/core";


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

export default function Audit() {
    return (
        <div>
            用户充值、资源上传审核界面
        </div>
    )
}