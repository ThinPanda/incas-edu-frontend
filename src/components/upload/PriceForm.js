import React, {useContext, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {FileContext} from "../../hooks/UploadFileContext";


export default function PriceForm() {

    const [file, setFile] = useState(null);
    const { dispatch } = useContext(FileContext);

    const handleFileInput = (e) => {
        setFile(e.target.files[0]);
        dispatch({type: "file", value: e.target.files[0]});
    };

    const handleInputChange = name => e => {
        dispatch({type: name, value: e.target.value});
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                File price
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField required id="fileReadPrice" label="阅读权价格" fullWidth onChange={handleInputChange("fileReadPrice")}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="fileOwnerShipPrice" label="所有权价格" fullWidth onChange={handleInputChange("fileOwnerShipPrice")}/>
                </Grid>
                <Grid item xs={12}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Typography variant="body1" style={{marginRight: "10px"}}>
                            上传资源
                        </Typography>
                        <input id="upload-file" type="file" multiple style={{display: "none"}} onChange={handleFileInput} formMethod="POST"/>
                        <label htmlFor="upload-file" style={{marginRight: "10px"}}>
                            <Button variant="contained" color="default" component="span">
                                Upload
                                <CloudUploadIcon/>
                            </Button>
                        </label>
                        <Typography variant="subtitle2" color="textSecondary">{file === null ? "" : file.name}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="fileDescription"
                        label="资源介绍"
                        multiline
                        rows="4"
                        placeholder="资源介绍将帮助用户更快的了解资源内容"
                        margin="normal"
                        variant="outlined"
                        onChange={handleInputChange("fileDescription")}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}