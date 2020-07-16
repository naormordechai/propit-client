import axios from 'axios';
import { ITodoCriteria } from '../models/todo-criteria';
import { ITodo } from '../models/todo';
const TODOS_URL = (process.env.NODE_ENV !== 'development')
    ? '/todos'
    : '//localhost:8080/todos';

export const getTodos = async (criteria: ITodoCriteria) => {
    return await axios.post(`${TODOS_URL}/get-todos`, criteria);
};

export const createTodo = async (todo: ITodo) => {
    return await axios.post(`${TODOS_URL}/create-todo`, todo);
};

export const updateTodo = async (todo: ITodo) => {
    return await axios.patch(`${TODOS_URL}/update-todo`, todo);
};

export const deleteTodo = async (todoId: string) => {
    return await axios.delete(`${TODOS_URL}/delete-todo/${todoId}`);
};