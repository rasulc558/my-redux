import * as actionTypes from "./actionTypes";

export function taskCompleeted(taskId) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id: taskId, compleeted: true },
  };
}

export function titleChange(taskId) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id: taskId, title: "updated title: " + taskId },
  };
}

export function taskDelete(taskId) {
  return {
    type: actionTypes.taskDelete,
    payload: { id: taskId },
  };
}
