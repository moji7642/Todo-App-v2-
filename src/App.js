import React, { useReducer, useState } from "react";
import Todo from "./Todo.js";
import "./App.css";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

function reducer(todos, actions) {
  switch (actions.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(actions.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === actions.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
      case ACTIONS.DELETE_TODO:
        return todos.filter(todo => todo.id !== actions.payload.id)
        default :
        return todos
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleOnClick(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  }

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button type="button" onClick={handleOnClick}>
        submit
      </button>
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </>
  );
}

export default App;
