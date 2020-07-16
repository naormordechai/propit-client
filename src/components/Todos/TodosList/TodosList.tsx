import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { HeaderTable } from './HeaderTable/HeaderTable';
import { ITodo } from '../../../models/todo';
import { TodoRow } from '../TodoRow/TodoRow';
import { ITodoCriteria } from '../../../models/todo-criteria';

import styles from './TodosList.module.scss';

interface TodosListProps {
    todos: ITodo[];
    taskCompletedHandler: (todo: ITodo) => void;
    openTodoPreviewDialog: (todo: ITodo) => void;
    openEditDialog: (todo: ITodo) => void;
    deleteTodoHandler: (todo: ITodo) => void;
    count: number;
    criteria: ITodoCriteria;
    page: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    isFinished:boolean;
}


export const TodosList: React.FC<TodosListProps> = (props) => {
    return <Paper>
        <TableContainer>
            <Table size="medium">
                <HeaderTable />
                {props.isFinished && <TableBody>
                    {props.todos && props.todos.map((todo: ITodo) => {
                        return (
                            <TodoRow
                                key={todo._id}
                                todo={todo}
                                taskCompletedHandler={props.taskCompletedHandler}
                                openTodoPreviewDialog={props.openTodoPreviewDialog}
                                openEditDialog={props.openEditDialog}
                                deleteTodoHandler={props.deleteTodoHandler}
                            />
                        );
                    })}
                </TableBody> }
            </Table>
        </TableContainer>
        <TablePagination
            classes={{selectRoot: "hidden", caption: styles.caption}}
            component="div"
            count={props.count}
            rowsPerPage={0}
            page={props.page}
            onChangePage={props.handleChangePage}
        />
    </Paper>
}
