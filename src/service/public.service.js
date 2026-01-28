import { axiosClient } from "./axiosClient";

export const getHero = async () => {
  const res = await axiosClient.get("/api/hero");
  return res.data;
};