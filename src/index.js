import React from "react";
import ReactDOM from "react-dom/client";
import {
  completTask,
  taskDelete,
  titleChange,
  getTasks,
  getTasksLoadingStatus,
  loadTasks,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";
// import { pipe, compose } from "lodash/fp";

// =================
// Create own Redux

const store = configureStore();

//

const App = (params) => {
  const state = useSelector(getTasks());
  const dispatch = useDispatch();
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  // const [state, setState] = React.useState(store.getState()); // useSelector заменил

  React.useEffect(() => {
    dispatch(loadTasks());
    // store.subscribe(() => setState(store.getState())); useSelector автоматически обновляет наш компонент
  }, []);

  // const completTask = (taskId) => {
  //   store.dispatch((dispatch, getState) => {
  //     // store.dispatch(taskCompleeted(taskId));
  //   });
  // };

  const changeTitle = (taskId) => {
    dispatch(titleChange(taskId));
  };

  const deleteTask = (taskId) => {
    dispatch(taskDelete(taskId));
  };

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <h1>Create Redux</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completTask(el.id))}>
              Compleet
            </button>
            <button onClick={() => changeTitle(el.id)}>Change Title</button>
            <button
              style={{ background: "red" }}
              onClick={() => deleteTask(el.id)}
            >
              Delete
            </button>
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
    <Provider store={store}>
      <App />
    </Provider>
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
