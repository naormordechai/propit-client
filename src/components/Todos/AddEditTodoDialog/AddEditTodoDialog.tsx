import React, { useState, useEffect } from 'react'
import { DialogTransition } from '../../../shared/components/DialogTranstion/DialogTransition'
import { DialogTitle, TextField, Button } from '@material-ui/core';
import { ITodo } from '../../../models/todo';

import styles from './AddEditTodoDialog.module.scss';

interface AddTodoDialogProps {
    title: string;
    btnText: string;
    todo?: ITodo;
    isOpen: boolean;
    onCloseAddEditDialog: () => void;
    onUpdateTodo?: (todo: ITodo) => void;
    onAddTodo?: (todo: ITodo) => void;
}

export const AddEditTodoDialog: React.FC<AddTodoDialogProps> = (props) => {
    const [todoVal, setTodoVal] = useState('');

    const onCloseDialog = () => {
        props.onCloseAddEditDialog();
    };

    const onSumit = () => {
        if (props.todo) {
            const updatedTodo: ITodo = {
                ...props.todo,
                text: todoVal
            }
            props.onUpdateTodo!(updatedTodo);
        } else {
            const newTodo: ITodo = {
                createdDate: new Date(),
                text: todoVal,
                isCompleted: false
            };
            props.onAddTodo!(newTodo);
        }
        onCloseDialog();
    };

    useEffect(() => {
        if (props.isOpen) {
            setTodoVal(props.todo?.text || '')
        }
    }, [props.isOpen])

    return (
        <div className="dialog-container">
            <DialogTransition open={props.isOpen} handleCloseDialogTransition={onCloseDialog}>
                <DialogTitle classes={{ root: 'dialog-title' }}>{props.title}</DialogTitle>
                <TextField variant="filled" value={todoVal} onChange={e => setTodoVal(e.target.value)} />
                <div className={styles.boxBtn}>
                    <Button onClick={onSumit} variant="contained" size="small" classes={{ root: styles.addBtnTodo }}>{props.btnText}</Button>
                </div>
            </DialogTransition>
        </div>
    )
}
