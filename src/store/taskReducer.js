import * as actionsType from "./actionTypes";

export function taskReducer(state, action) {
  switch (action.type) {
    case actionsType.taskUpdated: {
      const newArray = [...state];
      const elemIndex = newArray.findIndex((el) => el.id === action.payload.id);
      newArray[elemIndex] = { ...newArray[elemIndex], ...action.payload };
      return newArray;
    }
    case actionsType.taskDelete: {
      const newArray = [...state];
      return newArray.filter((el) => el.id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
}
