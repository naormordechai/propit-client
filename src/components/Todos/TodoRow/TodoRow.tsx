import React from 'react';
import { TableRow, Checkbox, TableCell, IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ITodo } from '../../../models/todo';
import moment from 'moment';

import styles from './TodoRow.module.scss';

interface TodoRowProps {
    todo: ITodo;
    taskCompletedHandler: (todo: ITodo) => void;
    openTodoPreviewDialog: (todo: ITodo) => void;
    openEditDialog: (todo: ITodo) => void;
    deleteTodoHandler: (todo: ITodo) => void;
}

export const TodoRow: React.FC<TodoRowProps> = (props) => {
    return <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={props.todo._id}
        selected={props.todo.isCompleted}
        classes={{ root: 'table-row' }}
    >
        <TableCell align="right" classes={{root: 'table-data'}}>
            <Checkbox
                onClick={() => props.taskCompletedHandler(props.todo)}
                checked={props.todo.isCompleted}
                size="small"
            />
        </TableCell>
        <TableCell align="right" scope="row" classes={{root: 'table-data'}}>
            {props.todo.text}
        </TableCell>
        <TableCell align="right" classes={{root: 'table-data'}}>{moment(props.todo.createdDate).format('DD/MM/YYYY')}</TableCell>
        <TableCell align="right" classes={{root: 'table-data'}}>
            <IconButton size="small" onClick={() => props.openTodoPreviewDialog(props.todo)}>
                <VisibilityIcon fontSize="inherit" />
            </IconButton>
            <IconButton size="small" onClick={() => props.openEditDialog(props.todo)}>
                <EditIcon fontSize="inherit" />
            </IconButton>

            <IconButton size="small" onClick={() => props.deleteTodoHandler(props.todo)}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>

        </TableCell>
    </TableRow>
}