import { axiosClient } from "./axiosClient";

export const adminLogin = async ({ email, password }) => {
  const res = await axiosClient.post("/api/login", { email, password });
  return res.data; 
};