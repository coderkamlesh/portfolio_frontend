import { useQuery } from "@tanstack/react-query";
import { fetchExperiences } from "@/service/experiences.service";

export const useExperiences = () =>
  useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
    staleTime: 1000 * 60 * 10,
  });
