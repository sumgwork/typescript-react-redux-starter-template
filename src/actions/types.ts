import { FetchTodosAction, DeleteTodoAction } from "./todos";

export enum ActionTypes {
  fetchTodos, //  by default this will be 0, then next one will be 1 and so on...
  deleteTodo,
}

export type Action = FetchTodosAction | DeleteTodoAction;
