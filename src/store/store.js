import { createStore } from "redux";
import { taskReducer } from "./taskReducer";

const initialState = [
  { id: 1, title: "task 1", compleeted: false },
  { id: 2, title: "task 2", compleeted: false },
];

export function initializeStore() {
  return createStore(taskReducer, initialState);
}
