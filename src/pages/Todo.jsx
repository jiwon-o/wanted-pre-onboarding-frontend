import React, { useEffect, useRef, useState } from "react";
import { postCreateTodo, getGetTodo, putUpdateTodo } from "../api/todoApi";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodo, setEditingTodo] = useState("");
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

  const handleTodoUpdate = async (id, updatedTodo, updatedIsCompleted) => {
    try {
      const response = await putUpdateTodo(id, {
        todo: updatedTodo,
        isCompleted: updatedIsCompleted,
      });
      console.log(response);

      const updatedTodos = todos.map((todoItem) => {
        if (todoItem.id === id) {
          return {
            ...todoItem,
            todo: updatedTodo,
            isCompleted: updatedIsCompleted,
          };
        }
        return todoItem;
      });
      setTodos(updatedTodos);
      handleCancelEditing();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartEditing = (id, todo) => {
    setEditingTodoId(id);
    setEditingTodo(todo);
  };

  const handleCancelEditing = () => {
    setEditingTodoId(null);
    setEditingTodo("");
  };

  const getTodoList = async () => {
    try {
      const response = await getGetTodo();

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
        {todos.map((todoItem) => (
          <li key={todoItem.id}>
            {editingTodoId === todoItem.id ? (
              <>
                <input
                  type="text"
                  value={editingTodo}
                  onChange={(e) => setEditingTodo(e.target.value)}
                />
                <button
                  onClick={() =>
                    handleTodoUpdate(
                      todoItem.id,
                      editingTodo,
                      todoItem.isCompleted
                    )
                  }>
                  제출
                </button>
                <button onClick={handleCancelEditing}>취소</button>
              </>
            ) : (
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={todoItem.isCompleted}
                    onChange={() =>
                      handleTodoUpdate(
                        todoItem.id,
                        todoItem.todo,
                        !todoItem.isCompleted
                      )
                    }
                  />
                  <span>{todoItem.todo}</span>
                </label>
                <button
                  onClick={() =>
                    handleStartEditing(todoItem.id, todoItem.todo)
                  }>
                  수정
                </button>
                <button>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
