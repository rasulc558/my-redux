export function logger(store) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // const { getState, dispatch } = store
      // console.log(store);
      // console.log(next);
      // console.log(action);

      // if (action.type === "task/update") {
      //   return dispatch({
      //     type: "task/remove",
      //     payload: { ...action.payload },
      //   });
      // }

      return next(action);
    };
  };
}
