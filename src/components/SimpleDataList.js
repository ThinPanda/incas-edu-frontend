import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        textAlign: 'left',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export function RechargeList(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const data = props.data;

    // const checked = {
    //     0: "待审核",
    //     1: "通过",
    //     2: "拒绝"
    // };

    return (
        Array.isArray(data) && data.length !== 0 ?
        <div className={classes.root}>
            {
                data.map((value, index) => {
                    let panel = "panel" + (index + 1);
                    return(
                        <ExpansionPanel expanded={expanded === panel} onChange={handleChange(panel)} key={index}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.heading}>充值金额：{value.rechargeAmount}</Typography>
                                <Typography className={classes.heading}>支付方式 ：{value.paymentMethod}</Typography>
                                {/*<Typography className={classes.heading}>审核状态：{checked[value.ifChecked]}</Typography>*/}
                                <Typography className={classes.heading}>处理人：{value.adminEmail}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography className={classes.secondaryHeading}>
                                    <span>
                                        流水号：{value.paymentId}
                                        <br/>
                                        交易时间：{new Date(value.createTime).toLocaleDateString() + " " + new Date(value.createTime).toLocaleTimeString()}
                                        <br/>
                                        审核人：{value.adminEmail}
                                    </span>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })
            }
        </div> : <Typography variant="subtitle2" color="textSecondary" align="center">暂没有充值记录</Typography>
    );
}

export function TransferList(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const data = props.data;

    return (
        Array.isArray(data) && data.length !== 0 ?
        <div className={classes.root}>
            {
                data.map((value, index) => {
                    let panel = "panel" + (index + 1);
                    return(
                        <ExpansionPanel expanded={expanded === panel} onChange={handleChange(panel)} key={index}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.heading}>目标账户：{value.toEmail}</Typography>
                                <Typography className={classes.heading}>目标账户类型：{value.beneficiaryType === 0 ? "普通用户":"机构用户"}</Typography>
                                <Typography className={classes.heading}>转账金额：{value.transferAmount}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography className={classes.secondaryHeading}>
                                    <span>
                                        流水号：{value.transferId}
                                        <br/>
                                        交易时间：{new Date(value.createTime).toLocaleDateString() + " " + new Date(value.createTime).toLocaleTimeString()}
                                    </span>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })
            }
        </div> : <Typography variant="subtitle2" color="textSecondary" align="center">暂没有转账记录</Typography>
    );
}


export function WithdrawList(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const data = props.data;

    return (
        Array.isArray(data) && data.length !== 0 ?
        <div className={classes.root}>
            {
                data.map((value, index) => {
                    let panel = "panel" + (index + 1);
                    return(
                        <ExpansionPanel expanded={expanded === panel} onChange={handleChange(panel)} key={index}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className={classes.heading}>提现金额：{value.withdrawAmount}</Typography>
                                <Typography className={classes.heading}>提现方式 ：{value.paymentMethod}</Typography>
                                <Typography className={classes.heading}>处理人：{value.adminEmail}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography className={classes.secondaryHeading}>
                                    <span>
                                        流水号：{value.paymentId}
                                        <br/>
                                        交易时间：{new Date(value.createTime).toLocaleDateString() + " " + new Date(value.createTime).toLocaleTimeString()}
                                        <br/>
                                        审核人：{value.adminEmail}
                                    </span>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })
            }
        </div> : <Typography variant="subtitle2" color="textSecondary" align="center">暂没有提现记录</Typography>
    );
}
