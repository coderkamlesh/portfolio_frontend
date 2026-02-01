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
  const res = await axiosClient.post("/api/admin/projects", data); 
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

export const getHeroData = async () => {
  const { data } = await axiosClient.get("/api/hero");
  return data.data;
};

export const updateHeroData = async (payload) => {
  const { data } = await axiosClient.put("/api/admin/hero", payload);
  return data;
};

export const updateAvatar = async (file) => {
  const formData = new FormData();
  formData.append("file", file); 

  const { data } = await axiosClient.patch("/api/admin/hero/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
export const updateProjectImage = async ({ id, file }) => {
  const formData = new FormData();
  formData.append("file", file); // Postman key: 'file'

  const { data } = await axiosClient.patch(`/api/admin/projects/image/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateExperienceLogo = async ({ id, file }) => {
  const formData = new FormData();
  formData.append("file", file); // Backend expects 'file'

  const { data } = await axiosClient.patch(`/api/admin/experiences/logo/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
// ... existing imports

// Update Skill Icon (Multipart)
export const updateSkillIcon = async ({ id, file }) => {
  const formData = new FormData();
  formData.append("file", file); // Backend expects 'file'

  const { data } = await axiosClient.patch(`/api/admin/skills/icon/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};