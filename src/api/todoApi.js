import { accessInstance } from "./axiosInstance";

export const postCreateTodo = async (data) => {
  const response = await accessInstance.post(`/todos`, data);
  console.log(response);
  return response.data;
};
