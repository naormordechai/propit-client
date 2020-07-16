import { ITodo } from '../../../models/todo';
import * as actionTypes from './actionTypes';
import { ITodoCriteria } from '../../../models/todo-criteria';
import { Dispatch } from 'react';
import { getTodos, updateTodo, deleteTodo, createTodo } from '../../../services/todos-service';

// load todos
interface LoadTodos {
    type: typeof actionTypes.LOAD_TODOS;
}

interface LoadTodosSuccess {
    type: typeof actionTypes.LOAD_TODOS_SUCCESS;
    payload: ITodo[];
}

interface LoadTodosFailed {
    type: typeof actionTypes.LOAD_TODOS_FAILED;
    payload: any;
}

//update todo
interface UpdateTodo {
    type: typeof actionTypes.UPDATE_TODO,
}

interface UpdateTodoSuccess {
    type: typeof actionTypes.UPDATE_TODO_SUCCESS,
    payload: ITodo
}

interface UpdateTodoFailed {
    type: typeof actionTypes.UPDATE_TODO_FAILED,
    payload: any;
}

//delete todo
interface DeleteTodo {
    type: typeof actionTypes.DELETE_TODO
}

interface DeleteTodoSuccess {
    type: typeof actionTypes.DELETE_TODO_SUCCESS,
    payload: string
}

interface DeleteTodoFailed {
    type: typeof actionTypes.DELETE_TODO_FAILED,
    payload: any
}

// set count
interface SetCount {
    type: typeof actionTypes.SET_COUNT_DOCUMETS;
    payload: number;
}

//update criteria
interface UpdateCriteria {
    type: typeof actionTypes.UPDATE_CRITERIA;
    payload: ITodoCriteria
}

//add todo
interface AddTodo {
    type: typeof actionTypes.ADD_TODO
}

interface AddTodoSuccess {
    type: typeof actionTypes.ADD_TODO_SUCCESS,
    payload: ITodo
}

interface AddTodoFailed {
    type: typeof actionTypes.ADD_TODO_FAILED,
    payload: any
}


const _loadTodos = (): LoadTodos => {
    return {
        type: actionTypes.LOAD_TODOS
    }
};

const _loadTodosSuccess = (data: ITodo[]): LoadTodosSuccess => {
    return {
        type: actionTypes.LOAD_TODOS_SUCCESS,
        payload: data
    }
}

const _loadTodosFailed = (err: any): LoadTodosFailed => {
    return {
        type: actionTypes.LOAD_TODOS_FAILED,
        payload: err
    }
};

const _updateTodo = (): UpdateTodo => {
    return {
        type: actionTypes.UPDATE_TODO
    }
}

const _updateTodoSuccess = (data: ITodo): UpdateTodoSuccess => {
    return {
        type: actionTypes.UPDATE_TODO_SUCCESS,
        payload: data
    }
}

const _updateTodoFaield = (data: any): UpdateTodoFailed => {
    return {
        type: actionTypes.UPDATE_TODO_FAILED,
        payload: data
    }
}

const _addTodo = (): AddTodo => {
    return {
        type: actionTypes.ADD_TODO
    }
}

const _addTodoSuccess = (data: ITodo): AddTodoSuccess => {
    return {
        type: actionTypes.ADD_TODO_SUCCESS,
        payload: data
    }
}

const _addTodoFailed = (data: any): AddTodoFailed => {
    return {
        type: actionTypes.ADD_TODO_FAILED,
        payload: data
    }
}


const _setCount = (data: number): SetCount => {
    return {
        type: actionTypes.SET_COUNT_DOCUMETS,
        payload: data
    }
};

const _deleteTodo = (): DeleteTodo => {
    return {
        type: actionTypes.DELETE_TODO
    }
}

const _deleteTodoSuccess = (todoId: string): DeleteTodoSuccess => {
    return {
        type: actionTypes.DELETE_TODO_SUCCESS,
        payload: todoId
    }
}

const _deleteTodoFailed = (data: any): DeleteTodoFailed => {
    return {
        type: actionTypes.DELETE_TODO_FAILED,
        payload: data
    }
}

export const loadTodos = (criteria: ITodoCriteria) => async (dispatch: Dispatch<any>) => {
    dispatch(_loadTodos())
    try {
        const { data } = await getTodos(criteria);
        dispatch(_loadTodosSuccess(data.todos));
        dispatch(_setCount(data.count));
    } catch (err) {
        dispatch(_loadTodosFailed(err))
    }
}

export const updateCriteria = (criteria: ITodoCriteria): UpdateCriteria => {
    return {
        type: actionTypes.UPDATE_CRITERIA,
        payload: criteria
    }
}

export const updateTodoHandler = (todo: ITodo) => async (dispatch: Dispatch<any>) => {
    dispatch(_updateTodo());
    try {
        await updateTodo(todo);
        dispatch(_updateTodoSuccess(todo));
    } catch (err) {
        dispatch(_updateTodoFaield(err))
    }
};

export const deleteTodoHandler = (todoId: string) => async (dispatch: Dispatch<any>) => {
    dispatch(_deleteTodo());
    try {
        await deleteTodo(todoId);
        dispatch(_deleteTodoSuccess(todoId));
    } catch (err) {
        dispatch(_deleteTodoFailed(err));
    }

};

export const addTodoHandler = (todo: ITodo) => async (dispatch: Dispatch<any>) => {
    dispatch(_addTodo());
    try {
        const { data } = await createTodo(todo);
        dispatch(_addTodoSuccess(data));
    } catch (err) {
        dispatch(_addTodoFailed(err));
    }
}



export type TodosActions =
    LoadTodos |
    LoadTodosSuccess |
    LoadTodosFailed |
    SetCount |
    UpdateCriteria |
    UpdateTodo |
    UpdateTodoSuccess |
    UpdateTodoFailed |
    DeleteTodo |
    DeleteTodoSuccess |
    DeleteTodoFailed |
    AddTodo |
    AddTodoSuccess |
    AddTodoFailed
    ;