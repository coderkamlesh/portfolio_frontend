import { axiosClient } from "@/service/axiosClient";

export const fetchHero = async () => {
  const res = await axiosClient.get("/api/hero");
  return res.data.data;
};
