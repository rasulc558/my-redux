import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, title: "task 1", compleeted: false },
  { id: 2, title: "task 2", compleeted: false },
];

// const update = createAction("task/updated");
// const remove = createAction("task/remove");

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    update(state, action) {
      const elemIndex = state.findIndex((el) => el.id === action.payload.id);
      state[elemIndex] = { ...state[elemIndex], ...action.payload };
    },
    remove(state, action) {
      return state.filter((el) => el.id !== action.payload.id);
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
const { update, remove } = actions;

export function taskCompleeted(taskId) {
  return update({ id: taskId, compleeted: true });
}

export function titleChange(taskId) {
  return update({ id: taskId, title: "updated title: " + taskId });
}

export function taskDelete(taskId) {
  return remove({ id: taskId });
}

export default taskReducer;
