import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import {
    adminAgreeResource,
    adminRejectResource,
    agencyBuyOwnership,
    userBuyReadPrice
} from "../fetch/requestAPI";


const SUCCESS_COLOR = green[300];
const FAILED_COLOR = red[200];
const UNCHECKED_COLOR = grey[500];

const msgColor = {
    0: UNCHECKED_COLOR,
    1: SUCCESS_COLOR,
    2: FAILED_COLOR
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: "15px",
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 650,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export function ResourceCard(props) {
    const data = props.data;
    const classes = useStyles();

    async function handleBuyService(id){
        console.log(id);
        let res;
        if(props.userType === "ORDINARY"){
            res = await userBuyReadPrice(id);
        } else if(props.userType === "AGENCY"){
            res = await agencyBuyOwnership(id);
            console.log(res)
        }
        if(res.$class){
            window.alert("购买成功！");
        }
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image} onClick={props.onClick}>
                            {/*<img className={classes.img} alt="complex" src="https://material-ui.com/static/images/grid/complex.jpg" />*/}
                            <img className={classes.img} alt="complex" src={data.fileImage} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {data.fileTitle}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2">
                                    所属类别：{data.fileContentType}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ID: {data.id}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    资源简介: {data.fileDescription}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {
                                    props.userType === "ADMIN" ?
                                    (
                                        <Typography variant="body2" color="textSecondary">
                                            审核人：{data.adminEmail ? data.adminEmail : "暂未审核"}
                                        </Typography>
                                    ) : (
                                    <div style={{textAlign: "right"}}>
                                        <Button variant="outlined" color="primary" onClick={()=> handleBuyService(data.id)}>
                                            购买
                                        </Button>
                                    </div>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <Grid item style={{width: 90}}>
                            <Typography variant="subtitle2">阅读权：${data.fileReadPrice}</Typography>
                            <Typography variant="subtitle2">所有权：${data.fileOwnerShipPrice}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export function ResourceAuditCard(props) {
    const data = props.data;
    const classes = useStyles();

    const [ifChecked, setIfChecked] = useState(false);
    const [resourceId, setResourceId] = useState(null);
    // const [audit, setAudit] = useState("to be checked");

    useEffect(() => {
        setIfChecked(props.ifChecked);
        setResourceId(data.id);
    }, []);

    const handleResourceAgree = async ()=> {
        // console.log(resourceId);
        let res = await adminAgreeResource(resourceId);
        if (res === "注册新资源"){
            window.alert("已通过审核")
        }
        setResourceId(null);
        // setAudit("AGREE");
    };

    const handleResourceDisAgree = async ()=> {
        let res = await adminRejectResource(resourceId);
        if (res === "已审核拒绝"){
            window.alert("已审核拒绝")
        }
        setResourceId(null);
        // setAudit("REJECT");
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} style={{backgroundColor: msgColor[ifChecked]}}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image} onClick={props.onClick}>
                            <img className={classes.img} alt="complex" src={data.fileImage} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {data.fileTitle}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2">
                                    所属类别：{data.fileContentType}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ID: {data.id}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Provider: {data.fileInitialProvider}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {
                                    ifChecked === 0 ?
                                    <div style={{display: "flex"}}>
                                        <span style={{flexGrow: 1, textAlign:'center'}}><Button variant="outlined" onClick={handleResourceAgree}>agree</Button></span>
                                        <span style={{flexGrow: 1, textAlign:'center'}}><Button variant="outlined" onClick={handleResourceDisAgree}>reject</Button></span>
                                    </div> :
                                    <div style={{display: "flex"}}>
                                        <span style={{flexGrow: 1, textAlign:'center'}}>CHECKED</span>
                                        <span style={{flexGrow: 1, textAlign:'center'}}>STATE: {ifChecked === 1 ? "AGREE" : "REJECT"}</span>
                                    </div>
                                }

                            </Grid>
                        </Grid>
                        <Grid item style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                            <Typography variant="subtitle2" style={{padding: "20px"}}>阅读权：${data.fileReadPrice}</Typography>
                            <Typography variant="subtitle2" style={{padding: "20px"}}>所有权：${data.fileOwnerShipPrice}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
