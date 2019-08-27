import React, {useContext, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FileContext } from "../../hooks/UploadFileContext";


export default function InformationForm() {

    const [provider, setProvider] = useState("");
    const { dispatch } = useContext(FileContext);

    const handleInputChange = name => e => {
        dispatch({type: name, value: e.target.value});
        if ( name === "fileInitialProvider") {
            setProvider(e.target.value);
        }
    };

    const handleRemember = (e)=> {
        if (e.target.checked){
            setProvider(localStorage.getItem("keyName"));
            dispatch({type: "fileInitialProvider", value: localStorage.getItem("keyName")});
        } else {
            setProvider("");
        }
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                File information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="fileTitle"
                        name="fileTitle"
                        label="资源名称"
                        fullWidth
                        onChange={handleInputChange("fileTitle")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="fileImage"
                        name="fileImage"
                        label="封面地址"
                        fullWidth
                        onChange={handleInputChange("fileImage")}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="fileKeyWord"
                        name="fileKeyWord"
                        label="关键字"
                        fullWidth
                        onChange={handleInputChange("fileKeyWord")}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="fileContentType"
                        name="fileContentType"
                        label="类型"
                        fullWidth
                        onChange={handleInputChange("fileContentType")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="fileInitialProvider"
                        name="fileInitialProvider"
                        label="初始提供者"
                        fullWidth
                        onChange={handleInputChange("fileInitialProvider")}
                        value={provider}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" onChange={handleRemember}/>}
                        label="自动填写"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}