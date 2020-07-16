import React from 'react';
import { DialogContent, DialogActions, DialogTitle, Button, DialogContentText } from '@material-ui/core';
import { DialogTransition } from '../DialogTranstion/DialogTransition';

import styles from './ConfirmDisplay.module.scss';

interface ConfirmDisplayProps {
    isOpen: boolean;
    onDisagree: () => void;
    onAgree: () => void;
    title: string;
    content: string;
}

export const ConfirmDisplay: React.FC<ConfirmDisplayProps> = (props) => {
    return (
        <DialogTransition open={props.isOpen} handleCloseDialogTransition={props.onDisagree}>
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.content}
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={props.onDisagree} classes={{ root: styles.disagreeBtn }} >לא, בטל</Button>
                <Button color="primary" onClick={props.onAgree} classes={{ root: styles.agreeBtn }}>כן, מחק</Button>
            </DialogActions>
        </DialogTransition>
    )
}