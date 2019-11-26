import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


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
    button: {
        // display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: "40px"
    }
}));

export default function Appeal() {

    const classes = useStyles();
    const [file, setFile] = useState(null);

    const handleFileInput = (e) => {
        console.log(e);
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
                                    label="资源ID"
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Typography variant="body1" style={{marginRight: "10px"}}>
                                        上传资源
                                    </Typography>
                                    <input id="upload-file" type="file" multiple style={{display: "none"}}
                                           onChange={handleFileInput} formMethod="POST"/>
                                    <label htmlFor="upload-file" style={{marginRight: "10px"}}>
                                        <Button variant="contained" color="default" component="span">
                                            Upload
                                            <CloudUploadIcon/>
                                        </Button>
                                    </label>
                                    <Typography variant="subtitle2" color="textSecondary">{file === null ? "" : file.name}</Typography>
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
                                />
                            </Grid>
                            <Grid item xs={12} style={{textAlign: "center"}}>
                                <Button variant="contained" color="primary" className={classes.button}>立即申诉</Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </div>
            </Paper>
        </div>
    )

}