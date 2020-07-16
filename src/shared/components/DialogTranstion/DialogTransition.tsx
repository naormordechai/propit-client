import React from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';

import { TransitionProps } from '@material-ui/core/transitions';

import styles from './DialogTransition.module.scss'

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props as any} />;
});

interface DialogTransitionProps {
    open: boolean;
    handleCloseDialogTransition: () => void;
}

export const DialogTransition: React.FC<DialogTransitionProps> = ({ open, handleCloseDialogTransition, children }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialogTransition}
            classes={{ paper: 'dialog-root-base' }}
        >
            <div className={styles.contenDialog}>
                {children}
            </div>
        </Dialog>
    )
}
