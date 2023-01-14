export function thunk({ getState, dispatch }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if (typeof action === "function") {
        action(dispatch, getState);
      } else {
        // console.log(typeof action);
        return next(action);
      }
    };
  };
}
