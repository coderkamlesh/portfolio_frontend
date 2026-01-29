import { axiosClient } from "@/service/axiosClient";

export const adminLogin = async ({ email, password }) => {
  const res = await axiosClient.post("/api/login", { email, password });
  return res.data;
};

// Add Skill
export const addSkill = async (data) => {
  const res = await axiosClient.post("/api/admin/skills/", data);
  return res.data;
};

// Update Skill
export const updateSkill = async ({ id, data }) => {
  const res = await axiosClient.put(`/api/admin/skills/${id}`, data);
  return res.data;
};

// Delete Skill
export const deleteSkill = async (id) => {
  const res = await axiosClient.delete(`/api/admin/skills/${id}`);
  return res.data;
};

// Add Experience
export const addExperience = async (data) => {
  const res = await axiosClient.post("/api/admin/experiences/", data);
  return res.data;
};

// Update Experience
export const updateExperience = async ({ id, data }) => {
  const res = await axiosClient.put(`/api/admin/experiences/${id}`, data);
  return res.data;
};

// Delete Experience
export const deleteExperience = async (id) => {
  const res = await axiosClient.delete(`/api/admin/experiences/${id}`);
  return res.data;
};

export const addProject = async (data) => {
  const res = await axiosClient.post("/api/admin/projects", data); // Fixed path: removed trailing slash based on screenshot
  return res.data;
};

// Update Project
export const updateProject = async ({ id, data }) => {
  const res = await axiosClient.put(`/api/admin/projects/${id}`, data);
  return res.data;
};

// Delete Project
export const deleteProject = async (id) => {
  const res = await axiosClient.delete(`/api/admin/projects/${id}`);
  return res.data;
};