import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useModal } from "../ModalContext";

function Flash(){
    const{open, setOpen} = useModal();

    return(
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false) }>
                <Alert
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
                >
                This is a success Alert inside a Snackbar!
                </Alert>
            </Snackbar>
        </>
    );
   
}

export default Flash;