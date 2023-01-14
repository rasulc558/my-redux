import {
  // createAction,
  createSlice,
} from "@reduxjs/toolkit";

import todosServices from "../serivces/todos.services";
import { setError } from "./errors";

const initialState = {
  entities: [],
  isLoading: true,
  // error: null
};

// const update = createAction("task/updated");
// const remove = createAction("task/remove");

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elemIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elemIndex] = {
        ...state.entities[elemIndex],
        ...action.payload,
      };
    },
    add(state, action) {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state, action) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
      // state.error = action.payload;
    },
  },
});

/*
const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      const elemIndex = state.findIndex((el) => el.id === action.payload.id);
      state[elemIndex] = { ...state[elemIndex], ...action.payload };
    })
    .addCase(remove, (state, action) => {
      return state.filter((el) => el.id !== action.payload.id);
    });
});

function _taskReducer(state, action) {
  switch (action.type) {
    case update.type: {
      const newArray = [...state];
      const elemIndex = newArray.findIndex((el) => el.id === action.payload.id);
      newArray[elemIndex] = { ...newArray[elemIndex], ...action.payload };
      return newArray;
    }
    case remove.type: {
      return state.filter((el) => el.id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
}
*/

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, taskRequestFailed, taskRequested, add } =
  actions;

export const completTask = (taskId) => (dispatch, getState) => {
  dispatch(update({ id: taskId, completed: true }));
};

export const addTask = () => async (dispatch) => {
  dispatch(taskRequested());

  try {
    const data = await todosServices.add({
      userId: 1,
      id: 3,
      title: "MY TASKS",
      completed: false,
    });

    dispatch(add(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

// export function taskCompleeted(taskId) {
//   return update({ id: taskId, compleeted: true });
// }

// const taskRequested = createAction("task/requested");
// const taskRequestFailed = createAction("task/requestfailed");

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosServices.fetchAll();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export function titleChange(taskId) {
  return update({ id: taskId, title: "updated title: " + taskId });
}

export function taskDelete(taskId) {
  return remove({ id: taskId });
}

export const getTasks = () => (state) => {
  return state.tasks.entities;
};

export const getTasksLoadingStatus = () => (state) => {
  return state.tasks.isLoading;
};
export default taskReducer;
