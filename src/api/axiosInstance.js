import axios from "axios";

export const URL = "https://www.pre-onboarding-selection-task.shop/";

// 기본 인스턴스
export const instance = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
});

// 토큰이 포함된 접근 인스턴스
export const accessInstance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

accessInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  return config;
});
