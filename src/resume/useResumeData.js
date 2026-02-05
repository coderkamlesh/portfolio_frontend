import { useHero } from "@/hooks/useHero";
import { useSkills } from "@/hooks/useSkills";
import { useExperiences } from "@/hooks/useExperiences";
import { useProjects } from "@/hooks/useProjects";

export const useResumeData = () => {
  const hero = useHero();
  const skills = useSkills();
  const experiences = useExperiences();
  const projects = useProjects();

  const isLoading =
    hero.isLoading ||
    skills.isLoading ||
    experiences.isLoading ||
    projects.isLoading;

  return {
    isLoading,
    data: isLoading
      ? null
      : {
          hero: hero.data,
          skills: skills.data,
          experiences: experiences.data,
          projects: projects.data,
        },
  };
};
