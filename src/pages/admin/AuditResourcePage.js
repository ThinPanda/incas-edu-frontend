import React, {useContext, useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {GlobalContext} from "../../hooks/GlobalContext";
import {
    adminGetResourceListR,
    adminGetResourceListW,
    adminGetResourceListY,
} from "../../fetch/requestAPI";
import {ResourceAuditCard} from "../../components/ResourceCard";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
        flexGrow: 1,
    },
    details: {
        flexGrow: 1,
        marginLeft: "40px",
    }
}));

export default function AuditResource() {
    const classes = useStyles();
    const { state } = useContext(GlobalContext);

    const [detail, setDetail] = useState(false);
    const [fileDetail, setFileDetail] = useState(null);

    const [resourceW, setResourceW] = useState(null);
    const [resourceY, setResourceY] = useState(null);
    const [resourceR, setResourceR] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (!state.isLogin){
            window.alert("您好,请先登录!");
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            const listW = await adminGetResourceListW();
            const listY = await adminGetResourceListY();
            const listR = await adminGetResourceListR();
            // console.log(list);
            setResourceW(listW);
            setResourceY(listY);
            setResourceR(listR);
            setIsLoading(false)
        };
        fetchData();
    }, []);

    // const openDetail = () => {
    //     setDetail(true);
    // };

    function openDetail(details){
        setDetail(true);
        setFileDetail(details);
    };

    const checkState = {
        0: "待审核",
        1: "已通过审核",
        2: "未通过审核"
    };

    return(
        <div className={classes.root}>
            <Paper className={classes.header}>
                <Typography variant='h5' align='center'>
                    资源审核
                </Typography>
            </Paper>
            {
                isLoading ? (
                    <Paper className={classes.details}>
                        Loading...
                    </Paper>
                ) : (
                    <div style={{display: "flex"}}>
                        <div className={classes.content}>
                            <Paper>
                                <Typography style={{padding: "10px"}}>待审核：</Typography>
                                {resourceW.map((value, index) => (
                                    <ResourceAuditCard data={value} ifChecked={0} onClick={()=> openDetail(value)} style={{padding: "30px"}} key={index}/>
                                ))}
                            </Paper>
                            <Paper>
                                <Typography style={{padding: "10px"}}>已通过：</Typography>
                                {resourceY.map((value, index) => (
                                    <ResourceAuditCard data={value} ifChecked={1} onClick={()=> openDetail(value)} style={{padding: "30px"}} key={index}/>
                                ))}
                            </Paper>
                            <Paper>
                                <Typography style={{padding: "10px"}}>已拒绝：</Typography>
                                {resourceR.map((value, index) => (
                                    <ResourceAuditCard data={value} ifChecked={2} onClick={()=> openDetail(value)} style={{padding: "30px"}} key={index}/>
                                ))}
                            </Paper>
                        </div>

                        {
                            detail &&
                            <Paper className={classes.details}>
                                <Button size="small" color="secondary" onClick={()=> setDetail(false)} style={{marginTop: "10px"}}>关闭</Button>
                                <Typography variant="h6" align="center" style={{marginTop: "50px", marginBottom: "30px"}}>资源详情</Typography>
                                <div style={{padding: 20}}>
                                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                        <Typography variant="subtitle1" color="textPrimary">ID</Typography>
                                        <Typography variant="body1" color="textSecondary">{fileDetail.id}</Typography>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                        <Typography variant="subtitle1" color="textPrimary">资源名称</Typography>
                                        <Typography variant="body1" color="textSecondary">{fileDetail.fileTitle}</Typography>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                        <Typography variant="subtitle1" color="textPrimary">资源类型</Typography>
                                        <Typography variant="body1" color="textSecondary">{fileDetail.fileContentType}</Typography>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                        <Typography variant="subtitle1" color="textPrimary">阅读权价格</Typography>
                                        <Typography variant="body1" color="textSecondary">{fileDetail.fileReadPrice}</Typography>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                        <Typography variant="subtitle1" color="textPrimary">所有权价格</Typography>
                                        <Typography variant="body1" color="textSecondary">{fileDetail.fileOwnerShipPrice}</Typography>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                        <Typography variant="subtitle1" color="textPrimary">资源提供者</Typography>
                                        <Typography variant="body1" color="textSecondary">{fileDetail.fileInitialProvider}</Typography>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                        <Typography variant="subtitle1" color="textPrimary">关键字</Typography>
                                        <Typography variant="body1" color="textSecondary">{fileDetail.fileKeyWord}</Typography>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                        <Typography variant="subtitle1" color="textPrimary">当前状态</Typography>
                                        <Typography variant="body1" color="textSecondary">{checkState[fileDetail.fileChecked]}</Typography>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                        <Typography variant="subtitle1" color="textPrimary">资源简介</Typography>
                                        {/*<TextField*/}
                                            {/*id="outlined-multiline-static"*/}
                                            {/*label="fileDescription"*/}
                                            {/*multiline*/}
                                            {/*rows="4"*/}
                                            {/*defaultValue="Default Value: this is file description"*/}
                                            {/*// className={classes.textField}*/}
                                            {/*disabled="true"*/}
                                            {/*margin="normal"*/}
                                            {/*variant="outlined"*/}
                                        {/*/>*/}
                                    </div>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="fileDescription"
                                        multiline
                                        rows="4"
                                        value={fileDetail.fileDescription}
                                        // className={classes.textField}
                                        disabled={true}
                                        fullWidth={true}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </div>
                            </Paper>
                        }
                    </div>
                )
            }
        </div>
    )
}