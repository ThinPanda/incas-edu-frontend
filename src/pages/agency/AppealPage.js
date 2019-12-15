import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import React, {useContext, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {appealService, getAgencyAppealList} from "../../fetch/requestAPI";
import Divider from '@material-ui/core/Divider';
import {AppealList} from "../../components/SimpleDataList";
import {GlobalContext} from "../../hooks/GlobalContext";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 3),
    },
    header: {
        padding: "inherit",
        marginBottom: "20px"
    },
    content: {
        display: 'flex',
        width: "600px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        marginBottom: "50px"
    },
    list: {
        padding: "30px"
    }
}));

export default function Appeal() {

    const { state } = useContext(GlobalContext);

    const classes = useStyles();
    const [infos, setInfos] = useState({
        id: null,
        detail: "",
        file: null
    });

    const [show, setShow] = useState(false);
    const [list, setList] = useState(null);

    const handleInputChange = name => e => {
        setInfos({...infos, [name]: e.target.value});
    };

    const handleFileInput = (e) => {
        setInfos({...infos, "file": e.target.files[0]});
    };

    const handleSubmit = async () => {
        console.log(infos);
        let res = await appealService(infos);
        console.log(res);
        if (res === "申诉请求已送达"){
            window.alert("申诉请求已提交成功!")
        }
    };

    const showTable = async () => {
        setShow(!show);
        // 注意：setShow 是异步操作，不会立马生效，现在的 show 还是之前的值，所以要取反
        if (!show){
            let response = await getAgencyAppealList(state.username);
            console.log("list", response);
            setList(response);
        }
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.header}>
                <Typography variant='h5' align='center'>
                    资源侵权上诉页面!
                </Typography>
            </Paper>
            <Paper>
                <div className={classes.content}>
                    <React.Fragment>
                        <Grid container spacing={6}>
                            <Grid item xs={12}  style={{marginTop: "30px"}}>
                                <TextField
                                    id="standard-basic"
                                    className={classes.textField}
                                    label="被侵权资源ID"
                                    margin="normal"
                                    fullWidth
                                    onChange={handleInputChange("id")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Typography variant="body1" style={{marginRight: "10px"}}>
                                        上传侵权材料
                                    </Typography>
                                    <input id="upload-file" type="file" multiple style={{display: "none"}}
                                           onChange={handleFileInput} formMethod="POST"/>
                                    <label htmlFor="upload-file" style={{marginRight: "10px"}}>
                                        <Button variant="contained" color="default" component="span">
                                            Upload
                                            <CloudUploadIcon/>
                                        </Button>
                                    </label>
                                    <Typography variant="subtitle2" color="textSecondary">{infos.file === null ? "" : infos.file.name}</Typography>
                                    {/*<Typography variant="subtitle2" color="textSecondary">file.name</Typography>*/}
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-full-width"
                                    label="侵权理由"
                                    style={{margin: 8}}
                                    placeholder="请填写您认为该资源侵权的理由"
                                    helperText="您的此次申诉请求将会被记录在区块链上"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    multiline
                                    rows="4"
                                    onChange={handleInputChange("detail")}
                                />
                            </Grid>
                            <Grid item xs={12} style={{display: "flex", justifyContent: "space-between"}}>
                                <Button variant="outlined" color="primary" className={classes.button} onClick={showTable}>{show ? "隐藏" : "显示"}申诉记录</Button>
                                <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>立即申诉</Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </div>
                <div className={classes.list}>
                    <Divider style={{marginBottom: "20px"}}/>
                    {
                        show ? <AppealList data={list} />: null
                    }
                </div>
            </Paper>
        </div>
    )

}