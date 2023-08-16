import { instance } from "./axiosInstance";

export const postSignup = async (data) => {
  const response = await instance.post(`/auth/signup`, data);
  console.log(response);
  return response.data;
};
