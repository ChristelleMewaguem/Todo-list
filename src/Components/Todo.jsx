import { useEffect } from "react";
import "./CSS/Todo.css";
import { useState } from "react";
import { useRef } from "react";
import TodoItems from "./TodoItems";

let count = 0;
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([
      ...todos,
      { no: count++, text: inputRef.current.value, display: "" },
    ]);
    inputRef.current.value = "";
    localStorage.setItem("todos_count", count);
  };
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
  }, [todos]);
  //
  const [sortBy, setSortBy] = useState(""); // stocker la méthode de tri

  const sortTodos = (method) => {
    let sortedTodos = [...todos];
    if (method === "alphabetical") {
      sortedTodos.sort((a, b) => a.text.localeCompare(b.text)); // tri par ordre alphabétique
    } else if (method === "priority") {
      sortedTodos.sort((a, b) => a.no - b.no); // tri par priorité
    }
    setTodos(sortedTodos);
    setSortBy(method);
  };

  //

  return (
    <div className="todo">
      <did className="todo-header">To-Do-List</did>
      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add Your Task"
          className="todo-input"
        ></input>
        <div
          onClick={() => {
            add();
          }}
          className="todo-add-btn"
        >
          ADD
        </div>
      </div>
      <div className="todo-sort">
        <button onClick={() => sortTodos("alphabetical")}>
          Sort alphabetically
        </button>
        <button onClick={() => sortTodos("priority")}>Sort by priority</button>
      </div>

      <div className="todo-list">
        {todos.map((item, index) => {
          return (
            <TodoItems
              key={index}
              setTodos={setTodos}
              no={item.no}
              display={item.display}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
