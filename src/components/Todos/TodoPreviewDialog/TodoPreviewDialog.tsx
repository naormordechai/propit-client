import React from 'react'
import { ITodo } from '../../../models/todo'
import { DialogTransition } from '../../../shared/components/DialogTranstion/DialogTransition'
import { DialogTitle } from '@material-ui/core';

import styles from './TodoPreviewDialog.module.scss';

interface TodoPreviewDialogProps {
    todo?: ITodo;
    isOpen: boolean;
    onCloseDialog: () => void;
}

export const TodoPreviewDialog: React.FC<TodoPreviewDialogProps> = (props) => {
    return (
        <DialogTransition open={props.isOpen} handleCloseDialogTransition={props.onCloseDialog}>
            <DialogTitle classes={{ root: 'dialog-title' }}>פרטי המשימה</DialogTitle>
            <div className={styles.row}>
                <span>שם המשימה</span>
                <span>{props.todo?.text}</span>
            </div>
            <div className={styles.row}>
                <span>תאריך המשימה</span>
                <span>{props.todo?.createdDate}</span>
            </div>
        </DialogTransition>
    )
}
