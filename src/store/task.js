const TASK_UPDATED = "task/updated";
const TASK_DELETED = "task/delete";

//
export function taskCompleeted(taskId) {
  return {
    type: TASK_UPDATED,
    payload: { id: taskId, compleeted: true },
  };
}

export function titleChange(taskId) {
  return {
    type: TASK_UPDATED,
    payload: { id: taskId, title: "updated title: " + taskId },
  };
}

export function taskDelete(taskId) {
  return {
    type: TASK_DELETED,
    payload: { id: taskId },
  };
}

//

function taskReducer(state, action) {
  switch (action.type) {
    case TASK_UPDATED: {
      const newArray = [...state];
      const elemIndex = newArray.findIndex((el) => el.id === action.payload.id);
      newArray[elemIndex] = { ...newArray[elemIndex], ...action.payload };
      return newArray;
    }
    case TASK_DELETED: {
      return state.filter((el) => el.id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
}

export default taskReducer;
