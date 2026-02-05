import { useQuery } from "@tanstack/react-query";
import { fetchHero } from "@/service/hero.service";

export const useHero = () =>
  useQuery({
    queryKey: ["hero"],
    queryFn: fetchHero,
    staleTime: 1000 * 60 * 10,
  });
