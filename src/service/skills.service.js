import { axiosClient } from "@/service/axiosClient";

export const fetchSkills = async () => {
  const res = await axiosClient.get("/api/skills");
  return res.data.data;
};
