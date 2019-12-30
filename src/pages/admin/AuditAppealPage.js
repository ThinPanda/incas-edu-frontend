import React, {useContext, useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {AppealAuditList, RechargeAuditList, WithdrawAuditList} from "../../components/AuditList";
import {
    adminGetRechargeList, adminGetResourceInfo,
    adminGetWithdrawList,
    getApprovedAppealList,
    getCheckedAppealList,
    getRejectAppealList,
    getUncheckedAppealList,
} from "../../fetch/requestAPI";
import {GlobalContext} from "../../hooks/GlobalContext";
import {navigate} from "@reach/router";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import {AppealResultList} from "../../components/SimpleDataList";
import TextField from "@material-ui/core/TextField/TextField";
import Divider from "@material-ui/core/Divider";


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

export default function AuditAppeal() {

    const classes = useStyles();
    const { state } = useContext(GlobalContext);

    const [showDetail, setShowDetail] = useState(false);
    const [fileDetail, setFileDetail] = useState(null);
    const [watermark, setWatermark] = useState({});
    const [reason, setReason] = useState("");

    const [ unchecked, setUnchecked ] = useState(null);
    const [ checked, setChecked ] = useState(null);
    const [ approved, setApproved ] = useState(null);
    const [ reject, setReject ] = useState(null);

    useEffect(() => {

        if (!state.isLogin){
            window.alert("您好,请先登录!");
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            let unchecked = await getUncheckedAppealList();
            setUnchecked(unchecked);
            let checked = await getCheckedAppealList();
            // 把一个对象中的两个集合合并成一个
            let checked_all = [...checked.approved, ...checked.reject];
            setChecked(checked_all);
        };
        fetchData();
    }, []);

    async function showFile(id, index, type) {
        let res = await adminGetResourceInfo(id);
        setFileDetail(res);
        setShowDetail(true);
        // console.log(index, type);
        let water_mark;
        switch (type) {
            case "unchecked":
                water_mark = unchecked[index].watermark;
                setReason(unchecked[index].detail);
                break;
            case "checked":
                water_mark = checked[index].watermark;
                setReason(checked[index].detail);
                break;
        }
        water_mark = water_mark.split(";");
        // console.log(water_mark);
        // console.log(reason);
        setWatermark({
            file: water_mark[0],
            owner: water_mark[1],
            downloader: water_mark[2]
        });
    }

    return (
        <div>
            <Paper className={classes.paper} component='div' elevation={5} >
                <br/>
                <Typography variant='h4' align='center'>
                    资源侵权申诉审核
                </Typography>
                <div style={{padding: '16px'}}>
                    <hr style={{margin: 20}}/>
                </div>
                <Typography variant="subtitle2" color="textSecondary" align="center">
                    管理员根据侵权材料中所提取出的水印信息结合弃权理由，对机构用户发起的资源侵权上述进行审核
                </Typography>
                <br/>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <Button variant="outlined" color="primary" className={classes.button}>申诉通过记录</Button>
                    <Button variant="outlined" color="primary" className={classes.button}>申诉拒绝记录</Button>
                </div>
            </Paper>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Paper className={classes.paper} style={{marginTop: "30px", flexGrow: 1}} component='div' elevation={5} >
                    <div style={{marginBottom: "20px"}}>
                        <br/>
                        <Typography variant='h5' align='center'>
                            待审核列表
                        </Typography>
                        <div style={{padding: '16px'}}>
                            <hr style={{margin: 20}}/>
                        </div>
                        <AppealAuditList onClick={showFile} data={unchecked}/>
                    </div>
                    <div style={{marginBottom: "20px"}}>
                        <br/>
                        <Typography variant='h5' align='center'>
                            已审核列表
                        </Typography>
                        <div style={{padding: '16px'}}>
                            <hr style={{margin: 20}}/>
                        </div>
                        <AppealResultList onClick={showFile} data={checked}/>
                    </div>
                </Paper>
                {
                    showDetail && fileDetail &&
                    <Paper className={classes.paper} style={{marginTop: "30px", flexGrow: 1, marginLeft: "40px"}} component='div' elevation={5} >
                        <Button size="small" color="secondary" onClick={()=> setShowDetail(false)} style={{marginTop: "10px"}}>关闭</Button>
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
                                <Typography variant="subtitle1" color="textPrimary">资源提供者</Typography>
                                <Typography variant="body1" color="textSecondary">{fileDetail.fileInitialProvider}</Typography>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                <Typography variant="subtitle1" color="textPrimary">关键字</Typography>
                                <Typography variant="body1" color="textSecondary">{fileDetail.fileKeyWord}</Typography>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                <Typography variant="subtitle1" color="textPrimary">资源简介</Typography>
                            </div>
                            <TextField
                                id="outlined-multiline-static1"
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
                            <Divider style={{margin: "20px 0px 20px 0px"}}/>
                            <Typography variant="body1" color="textSecondary" style={{textAlign: "center",marginBottom: "10px"}}>提取的水印信息</Typography>
                            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                <Typography variant="subtitle1" color="textPrimary">资源ID(水印)</Typography>
                                <Typography variant="body1" color="textSecondary">{watermark.file}</Typography>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                <Typography variant="subtitle1" color="textPrimary">资源拥有者</Typography>
                                <Typography variant="body1" color="textSecondary">{watermark.owner}</Typography>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                <Typography variant="subtitle1" color="textPrimary">资源下载者</Typography>
                                <Typography variant="body1" color="textSecondary">{watermark.downloader}</Typography>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                                <Typography variant="subtitle1" color="textPrimary">申诉理由</Typography>
                            </div>
                            <TextField
                                id="outlined-multiline-static2"
                                label="appealInfo"
                                multiline
                                rows="4"
                                value={reason}
                                disabled={true}
                                fullWidth={true}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                    </Paper>
                }
            </div>
        </div>
    )
}