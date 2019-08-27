import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {FileContext} from "../../hooks/UploadFileContext";

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review() {
    const classes = useStyles();

    const { state } = useContext(FileContext);

    const note = {
        fileTitle: "资源名称",
        fileImage: "封面地址",
        fileKeyWord: "关键字",
        fileContentType: "类型",
        fileInitialProvider: "初始提供者",
        fileReadPrice: "阅读权价格",
        fileOwnerShipPrice: "所有权价格",
        file: "待上传资源",
        fileDescription: "资源介绍",
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Resource summary
            </Typography>
            {/*<button onClick={()=> console.log(state["file"].name)}>files</button>*/}
            <List disablePadding>
                { Object.keys(state).map((value, index) => (

                    <ListItem className={classes.listItem} key={index} >
                        <ListItemText primary={value} secondary={note[value]}/>
                        { value === "file" ? <Typography variant="body2">{state[value].name}</Typography> : <Typography variant="body2">{state[value]}</Typography>}
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}