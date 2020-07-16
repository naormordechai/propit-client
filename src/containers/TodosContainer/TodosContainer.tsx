import React, { useState, useEffect } from 'react';
import { ConfirmDisplay } from '../../shared/components/ConfirmDisplay/ConfirmDisplay';
import { TodosHeader } from '../../components/Todos/TodosHeader/TodosHeader';
import { TodosSearch } from '../../components/Todos/TodosSearch/TodosSearch';
import { TodosCountDisplay } from '../../components/Todos/TodosCountDisplay/TodosCountDisplay';
import { Button, CircularProgress } from '@material-ui/core';
import styles from './TodosContainer.module.scss';
import * as actions from '../../store/actions/actionsTodos/index';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../..';
import { ITodoCriteria } from '../../models/todo-criteria';
import { ITodo } from '../../models/todo';
import { AddEditTodoDialog } from '../../components/Todos/AddEditTodoDialog/AddEditTodoDialog';
import { TodoPreviewDialog } from '../../components/Todos/TodoPreviewDialog/TodoPreviewDialog';
import { TodosList } from '../../components/Todos/TodosList/TodosList';


export const TodosContainer: React.FC<any> = (props) => {
    const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [isOpeAddDialog, setIsOpenAddDialog] = useState<boolean>(false);
    const [isOpeEditDialog, setIsOpeEditDialog] = useState<boolean>(false);
    const [isOpenTodoPreviewDialog, setIsOpenTodoPreviewDialog] = useState<boolean>(false);
    const [currentActiveTodo, setCurrentActiveTodo] = useState<ITodo>();

    const criteria: ITodoCriteria = useSelector<AppState, any>(state => state.todosReducer.criteria);
    const isLoading: boolean = useSelector<AppState, any>(state => state.todosReducer.isLoading);
    const isFinished: boolean = useSelector<AppState, any>(state => state.todosReducer.isFinished);
    const todos = useSelector<AppState, any>(state => state.todosReducer.todos);
    const count = useSelector<AppState, any>(state => state.todosReducer.count);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.loadTodos(criteria))
    }, [dispatch, criteria])

    const handleChangePage = (event: unknown, newPage: any) => {
        dispatch(actions.updateCriteria({ ...criteria, offset: newPage * criteria.pageSize }))
        setPage(newPage);
    };

    const updateTodo = (todo: ITodo) => {
        dispatch(actions.updateTodoHandler(todo));
    }

    const onChangeSearchHandler = (term: string) => {
        dispatch(actions.updateCriteria({ ...criteria, offset: 0, pageSize: 5, term }))
    }

    const todoRowClicked = (todo: ITodo) => {
        const copyTodo = { ...todo };
        copyTodo.isCompleted = !copyTodo.isCompleted;
        updateTodo(copyTodo);
    };

    const deleteTodoHandler = () => {
        if (currentActiveTodo && currentActiveTodo._id) {
            dispatch(actions.deleteTodoHandler(currentActiveTodo._id));
            setIsOpenDeleteConfirm(false);
        }
    };

    const addTodo = (todo: ITodo) => {
        dispatch(actions.addTodoHandler(todo))
    };

    const openEditDialog = (todo: ITodo) => {
        setCurrentActiveTodo(todo);
        setIsOpeEditDialog(true);
    }

    const openTodoPreviewDialog = (todo: ITodo) => {
        setCurrentActiveTodo(todo);
        setIsOpenTodoPreviewDialog(true);
    }

    const openDialogDeleteHandler = (todo: ITodo) => {
        setCurrentActiveTodo(todo);
        setIsOpenDeleteConfirm(true);
    }

    return (
        <div className="container">
            <ConfirmDisplay
                isOpen={isOpenDeleteConfirm}
                onDisagree={() => setIsOpenDeleteConfirm(false)}
                onAgree={deleteTodoHandler}
                title="מחיקת משימה"
                content="האם אתה בטוח שתרצה למחוק?"/>
            <TodoPreviewDialog isOpen={isOpenTodoPreviewDialog} onCloseDialog={() => setIsOpenTodoPreviewDialog(false)} todo={currentActiveTodo} />
            <AddEditTodoDialog
                title="הוספת משימה חדשה"
                btnText="הוסף משימה"
                isOpen={isOpeAddDialog}
                onCloseAddEditDialog={() => setIsOpenAddDialog(false)}
                onAddTodo={addTodo} />
            <AddEditTodoDialog
                title="עדכון משימה"
                btnText="עדכן משימה"
                isOpen={isOpeEditDialog}
                onCloseAddEditDialog={() => setIsOpeEditDialog(false)}
                todo={currentActiveTodo}
                onUpdateTodo={updateTodo} />
            <TodosHeader headerTitle="ניהול משימות" />
            <TodosSearch onSearch={onChangeSearchHandler} />
            {isLoading && <CircularProgress classes={{ root: styles.circularProgress }} thickness={6.5} size={50} />}
            <section className={styles.sectionDisplayCount}>
                <TodosCountDisplay count={count} />
                <Button onClick={() => setIsOpenAddDialog(true)} variant="contained" size="small" classes={{ root: styles.newTasBtn }}>משימה חדשה</Button>
            </section>
            <TodosList
                todos={todos}
                taskCompletedHandler={todoRowClicked}
                openTodoPreviewDialog={openTodoPreviewDialog}
                openEditDialog={openEditDialog}
                deleteTodoHandler={openDialogDeleteHandler}
                count={count}
                criteria={criteria}
                page={page}
                handleChangePage={handleChangePage}
                isFinished={isFinished}
            />
        </div>
    )
}
