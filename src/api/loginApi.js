import { instance } from "./axiosInstance";

export const postLogin = async (data) => {
  const response = await instance.post(`/auth/signin`, data);
  console.log(response);
  return response.data;
};
