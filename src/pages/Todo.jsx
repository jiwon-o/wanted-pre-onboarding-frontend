import React, { useRef, useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const inputRef = useRef(null);

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleNewTodoAdd = () => {
    if (newTodo.trim() === "") {
      setNewTodo("");
      inputRef.current.focus();
      return;
    }
    setTodos([...todos, { text: newTodo, isCompleted: false }]);
    setNewTodo("");
    inputRef.current.focus();
  };

  return (
    <>
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTodo}
        onChange={handleNewTodoChange}
        ref={inputRef}
        data-testid="new-todo-input"
      />
      <button data-testid="new-todo-add-button" onClick={handleNewTodoAdd}>
        추가
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <label>
              <input type="checkbox" />
              <span>{todo.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
