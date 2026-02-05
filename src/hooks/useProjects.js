import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/service/projects.service";

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 10,
  });
