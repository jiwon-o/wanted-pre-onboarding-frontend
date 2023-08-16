import React, { useEffect, useRef, useState } from "react";
import { postCreateTodo, getGetTodo } from "../api/todoApi";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    getTodoList();
  });

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleNewTodoAdd = async () => {
    if (newTodo.trim() === "") {
      setNewTodo("");
      inputRef.current.focus();
      return;
    }

    try {
      const data = { todo: newTodo };
      const response = await postCreateTodo(data);
      console.log(response);

      const newTodoItem = {
        id: response.id,
        todo: response.todo,
        isCompleted: response.isCompleted,
        userId: response.userId,
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      inputRef.current.focus();
    } catch (error) {
      console.error(error);
    }
  };

  const getTodoList = async () => {
    try {
      const response = await getGetTodo();
      console.log(response);

      setTodos(response);
    } catch (error) {
      console.error(error);
    }
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
        {todos.map((todoItem, index) => (
          <li key={index}>
            <label>
              <input type="checkbox" />
              <span>{todoItem.todo}</span>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
