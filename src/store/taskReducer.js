import { taskUpdated } from "./actionTypes";

export function taskReducer(state, action) {
  switch (action.type) {
    case taskUpdated: {
      const newArray = [...state];
      const elemIndex = newArray.findIndex((el) => el.id === action.payload.id);
      newArray[elemIndex] = { ...newArray[elemIndex], ...action.payload };
      return newArray;
    }
    default: {
      return state;
    }
  }
}
