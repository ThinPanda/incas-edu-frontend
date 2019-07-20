import React from "react";
import {withStyles} from "@material-ui/core";
import LayoutCenter from "../components/LayoutCenter";


const styles = {
    background: {
        // background: 'linear-gradient(45deg, #4caf50 30%, #00b0ff 90%)',
        background: 'linear-gradient(to left bottom, hsl(118, 100%, 85%) 0%, hsl(168, 100%, 85%) 100%)',
        height: '100vh'
    },
};

function HomePage(props) {
    return(
        <section className={props.classes.background}>
            <LayoutCenter>
                this is incas-lab front-end developed by thinPanda using react
            </LayoutCenter>
        </section>
    )
}

export default withStyles(styles)(HomePage);