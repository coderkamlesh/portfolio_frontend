import { axiosClient } from "@/service/axiosClient";

export const fetchProjects = async () => {
  const res = await axiosClient.get("/api/projects");
  return res.data.data;
};
