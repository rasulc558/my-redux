export function createStore(reducer, initialState) {
  let state = initialState;
  let listners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);

    for (let i = 0; i < listners.length; i++) {
      const listner = listners[i];
      listner();
    }
  }

  function subscribe(listner) {
    listners.push(listner);
  }

  return { getState, dispatch, subscribe };
}
