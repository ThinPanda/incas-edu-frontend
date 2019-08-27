import React from "react";
import {withStyles} from "@material-ui/core"

const styles = {
    pos: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
};

function LayoutCenter(props) {
    return(
        <div className={props.classes.pos}>
            {props.children}
        </div>
    )
}


export default withStyles(styles)(LayoutCenter);
