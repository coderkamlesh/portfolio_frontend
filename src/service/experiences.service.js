import { axiosClient } from "@/service/axiosClient";

export const fetchExperiences = async () => {
  const res = await axiosClient.get("/api/experiences");
  return res.data.data;
};
