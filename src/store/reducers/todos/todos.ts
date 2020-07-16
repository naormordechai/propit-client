import { ITodo } from '../../../models/todo';
import { TodosActions } from '../../actions/actionsTodos/todos';
import * as actionTypes from '../../actions/actionsTodos/actionTypes';
import { ITodoCriteria } from '../../../models/todo-criteria';

interface TodosState {
    todos: ITodo[];
    criteria: ITodoCriteria;
    count: number;
    isLoading: boolean;
    isFinished: boolean;
    error: any;
}

const initialState: TodosState = {
    todos: [],
    criteria: {
        offset: 0,
        pageSize: 5
    },
    count: 0,
    isLoading: false,
    isFinished: false,
    error: null
}

const reducer = (state = initialState, action: TodosActions) => {
    switch (action.type) {
        case actionTypes.LOAD_TODOS:
            return {
                ...state,
                isLoading: true,
                isFinished: false
            }
        case actionTypes.LOAD_TODOS_SUCCESS:
            return {
                ...state,
                todos: action.payload,
                isLoading: false,
                isFinished: true
            }

        case actionTypes.SET_COUNT_DOCUMETS:
            return {
                ...state,
                count: action.payload
            }
        case actionTypes.UPDATE_CRITERIA:
            return {
                ...state,
                criteria: action.payload
            }
        case actionTypes.UPDATE_TODO:
            return {
                ...state,
            }
        case actionTypes.UPDATE_TODO_SUCCESS:
            const copyTodos = [...state.todos];
            const index = state.todos.findIndex(todo => todo._id === action.payload._id);
            copyTodos[index] = action.payload;
            return {
                ...state,
                todos: copyTodos,
            }
        case actionTypes.DELETE_TODO:
            return {
                ...state,
                isLoading: true,
                isFinished: false
            }

        case actionTypes.DELETE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.payload),
                count: state.count - 1,
                isLoading: false,
                isFinished: true
            }
        case actionTypes.ADD_TODO:
            return {
                ...state,
                isLoading: true,
                isFinished: false
            }
        case actionTypes.ADD_TODO_SUCCESS:
            return {
                ...state,
                todos: [action.payload, ...state.todos],
                count: state.count + 1,
                isLoading: false,
                isFinished: true
            }
        case actionTypes.ADD_TODO_FAILED:
        case actionTypes.UPDATE_TODO_FAILED:
        case actionTypes.DELETE_TODO_FAILED:
        case actionTypes.LOAD_TODOS_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                isFinished: true
            }
        default:
            return state;
    }
}

export default reducer;