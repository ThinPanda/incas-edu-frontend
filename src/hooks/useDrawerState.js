import React, { useState } from "react";

function useDrawerState(state) {
    const [open, setOpen] = React.useState(state);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return open;
}

export default useDrawerState;