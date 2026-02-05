import { useQuery } from "@tanstack/react-query";
import { fetchSkills } from "@/service/skills.service";

export const useSkills = () =>
  useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 1000 * 60 * 10,
  });
