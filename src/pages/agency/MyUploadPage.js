import React, {useContext, useEffect, useState} from "react";
import ItemsList from "../../components/ItemList";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import { GlobalContext } from "../../hooks/GlobalContext";
import Paper from "@material-ui/core/Paper";
import {
    getAgencyResourceListR,
    getAgencyResourceListU,
    getAgencyResourceListY
} from "../../fetch/requestAPI";
import {navigate} from "@reach/router";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2,3),
    },
    header: {
        padding: "inherit",
        marginBottom: "20px"
    },
}));

export default function MyUpload() {
    const classes = useStyles();
    const { state } = useContext(GlobalContext);

    const [isLoading, setIsLoading] = useState(true);
    const [myUploadU, setMyUploadU] = useState(null);
    const [myUploadY, setMyUploadY] = useState(null);
    const [myUploadR, setMyUploadR] = useState(null);

    useEffect(() => {

        if (!state.isLogin){
            window.alert("您好,请先登录!");
            navigate("/login");
            return;
        }

        const fetchData = async () => {

            setIsLoading(true);
            const listU = await getAgencyResourceListU();
            const listY = await getAgencyResourceListY();
            const listR = await getAgencyResourceListR();

            // console.log(listU);

            setMyUploadU(listU);
            setMyUploadY(listY);
            setMyUploadR(listR);

            setIsLoading(false);
        };
        fetchData();
    }, []);

    return(
        <div className={classes.root}>
            <Paper className={classes.header}>
                <Typography variant='h5' align='center'>
                    已上传资源界面
                </Typography>
            </Paper>
            <Paper>
                {
                    isLoading ? (
                        <Typography>
                            loading...
                        </Typography>
                    ) : (
                        <div>
                            <div>
                                <Typography variant="subtitle1" align="center" style={{paddingTop: "20px"}}>待审核资源列表</Typography>
                                <ItemsList data={myUploadU} ifChecked={0}/>
                            </div>
                            <div>
                                <Typography variant="subtitle1" align="center" style={{paddingTop: "20px"}}>审核通过资源列表</Typography>
                                <ItemsList data={myUploadY} ifChecked={1}/>
                            </div>
                            <div>
                                <Typography variant="subtitle1" align="center" style={{paddingTop: "20px"}}>未通过审核资源列表</Typography>
                                <ItemsList data={myUploadR} ifChecked={2}/>
                            </div>
                        </div>
                    )
                }
            </Paper>
        </div>
    )
}
