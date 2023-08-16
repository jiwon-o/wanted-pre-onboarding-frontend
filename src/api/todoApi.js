import { accessInstance } from "./axiosInstance";

export const postCreateTodo = async (data) => {
  const response = await accessInstance.post(`/todos`, data);
  return response.data;
};

export const getTodo = async (data) => {
  const response = await accessInstance.get(`/todos`, data);
  return response.data;
};

export const putUpdateTodo = async (id, data) => {
  const response = await accessInstance.put(`/todos/${id}`, data);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await accessInstance.delete(`/todos/${id}`);
  console.log(response);
  return response.data;
};
