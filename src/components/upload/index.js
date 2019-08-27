import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './InformationForm';
import PaymentForm from './PriceForm';
import Review from './Review';
import {FileContext} from "../../hooks/UploadFileContext";
import {navigate} from "@reach/router";
import {uploadResource} from "../../fetch/requestAPI";


const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Resource information', 'Resource price', 'Review your resource'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function UploadForm() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const { state } = useContext(FileContext);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = async () => {
        console.log(state);
        let res = await uploadResource(state);
        if (res === "注册新资源成功"){
            window.alert("资源上传成功！");
        }
    };

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Upload
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    发布资源成功!
                                </Typography>
                                <Typography variant="subtitle1">
                                    您的资源已经成功上传，待管理员进行审核确认后会发布到资源中心
                                    <br/>您也可以在「我的资源」页面随时查看审核情况。
                                </Typography>
                                <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={()=>navigate('/myUpload')}
                                        className={classes.button}
                                    >
                                        查看我的资源
                                    </Button>
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    {
                                        activeStep === steps.length - 1 ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleSubmit}
                                                className={classes.button}
                                            >
                                                Upload
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                Next
                                            </Button>
                                        )
                                    }
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </div>
            </main>
        </React.Fragment>
    );
}