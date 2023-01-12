import { createStore } from "redux";
import taskReducer from "./task";

const initialState = [
  { id: 1, title: "task 1", compleeted: false },
  { id: 2, title: "task 2", compleeted: false },
];

function configureStore() {
  return createStore(taskReducer, initialState);
}

export default configureStore;
