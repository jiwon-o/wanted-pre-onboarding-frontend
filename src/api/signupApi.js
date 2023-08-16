import { instance } from "./axiosInstance";

export const postSignUp = async (data) => {
  const response = await instance.post(`/auth/signup`, data);
  return response.data;
};
