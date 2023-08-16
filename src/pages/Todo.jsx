import React, { useEffect, useRef, useState } from "react";
import {
  postCreateTodo,
  getTodo,
  putUpdateTodo,
  deleteTodo,
} from "../api/todoApi";
import { styled } from "styled-components";

const TodoWrapper = styled.article`
  width: 520px;
  margin: 100px auto;
  border: 1px solid var(--color-border);
  border-radius: 10px;
`;

const TodoHeader = styled.header`
  text-align: center;
  border-bottom: 1px solid var(--color-border);
`;

const HeaderTitle = styled.h2`
  padding: 20px 0;
`;

const TodoSection = styled.section`
  padding: 26px 24px 0;

  h3 {
    margin-bottom: 20px;
  }
`;

const InputBox = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;

  button {
    flex-shrink: 0;
  }
`;

const StyledButton = styled.button`
  width: 60px;
  height: 50px;
  background-color: #2f80ed;
  border-radius: 5px;
  color: white;
  font-size: 18px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 15px 16px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;

  &:focus {
    outline: 2px solid #2f80ed;
  }
`;

const StyledList = styled.li`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;

  label {
    width: 100%;
  }

  button {
    flex-shrink: 0;
  }

  label span {
    display: inline-block;
    margin-left: 20px;
    flex-shrink: 0;
    font-weight: 600;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

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

  const handleTodoDelete = async (id) => {
    try {
      await deleteTodo(id);
      const updatedTodos = todos.filter((todoItem) => todoItem.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewTodoClick = () => {
    handleCancelEditing();
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
      const response = await getTodo();

      setTodos(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TodoWrapper>
        <TodoHeader>
          <HeaderTitle>Todo List</HeaderTitle>
        </TodoHeader>
        <TodoSection>
          <InputBox>
            <StyledInput
              type="text"
              value={newTodo}
              onClick={handleNewTodoClick}
              onChange={handleNewTodoChange}
              ref={inputRef}
              data-testid="new-todo-input"
            />
            <StyledButton
              data-testid="new-todo-add-button"
              onClick={handleNewTodoAdd}>
              추가
            </StyledButton>
          </InputBox>

          <ul>
            {todos.map((todoItem) => (
              <StyledList key={todoItem.id}>
                {editingTodoId === todoItem.id ? (
                  <>
                    <StyledInput
                      type="text"
                      value={editingTodo}
                      onChange={(e) => setEditingTodo(e.target.value)}
                      data-testid="modify-input"
                    />
                    <StyledButton
                      data-testid="submit-button"
                      onClick={() =>
                        handleTodoUpdate(
                          todoItem.id,
                          editingTodo,
                          todoItem.isCompleted
                        )
                      }>
                      제출
                    </StyledButton>
                    <StyledButton
                      data-testid="cancel-button"
                      onClick={handleCancelEditing}>
                      취소
                    </StyledButton>
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
                    <StyledButton
                      data-testid="modify-button"
                      onClick={() =>
                        handleStartEditing(todoItem.id, todoItem.todo)
                      }>
                      수정
                    </StyledButton>
                    <StyledButton
                      data-testid="delete-button"
                      onClick={() => handleTodoDelete(todoItem.id)}>
                      삭제
                    </StyledButton>
                  </>
                )}
              </StyledList>
            ))}
          </ul>
        </TodoSection>
      </TodoWrapper>
    </>
  );
}
