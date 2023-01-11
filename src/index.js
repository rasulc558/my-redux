import React from "react";
import ReactDOM from "react-dom/client";
// import { pipe, compose } from "lodash/fp";

// =================
// Create own Redux
function createStore(reducer, initialState) {
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

function taskReducer(state, action) {
  switch (action.type) {
    case "task/complited": {
      const newArray = [...state];
      const elemIndex = newArray.findIndex((el) => el.id === action.payload.id);
      newArray[elemIndex].compleeted = true;
      return newArray;
    }
    default: {
      return state;
    }
  }
}

const store = createStore(taskReducer, [
  { id: 1, description: "task 1", compleeted: false },
  { id: 2, description: "task 2", compleeted: false },
]);

const App = (params) => {
  const [state, setState] = React.useState(store.getState());

  React.useEffect(() => {
    store.subscribe(() => setState(store.getState()));
  }, []);

  const completTask = (taskId) => {
    store.dispatch({ type: "task/complited", payload: { id: taskId } });
  };

  return (
    <>
      <h1>Create Rdux</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.description}</p>
            <p>{`Completed: ${el.compleeted}`}</p>
            <button onClick={() => completTask(el.id)}>Compleet</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*

  const x = 2;
  const double = (number) => number * 2;
  const square = (number) => number * number;
  const half = (number) => number / 2;
  const divide = (num2) => (num1) => num1 / num2;

  const mathCalculate = pipe(half, square, double, divide(2));


  // ==========

  const range = {
    from: 1,
    to: 5,
  };

  range[Symbol.iterator] = function () {
    return {
      from: this.from,
      to: this.to,
      next() {
        if (this.from < this.to) {
          return {
            value: this.from++,
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  };

  for (let num of range) {
    console.log(num);
  }


  ========


  
const Input = () => {
  const input2 = React.useRef();

  return (
    <>
      <input
        type="text"
        placeholder="input 1"
        onChange={({ target }) => {
          input2.current.value = target.value;
          // console.log(input1.current.value);
        }}
      />
      <input type="text" ref={input2} />
    </>
  );
};



*/
