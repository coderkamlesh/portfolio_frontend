import { axiosClient } from "./axiosClient";

export const getHero = async () => {
  const res = await axiosClient.get("/api/hero");
  return res.data;
};
export const getSkills = async () => {
  const res = await axiosClient.get("/api/skills");
  return res.data;
};
export const getExperiences = async () => {
  const res = await axiosClient.get("/api/experiences");
  return res.data;
};
export const getProjects = async () => {
  const res = await axiosClient.get("/api/projects");
  return res.data;
};