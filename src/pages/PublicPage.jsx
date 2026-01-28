import ExperienceSection from "@/components/user/ExperienceSection";
import HeroSection from "@/components/user/HeroSection";
import ProjectsSection from "@/components/user/ProjectsSection";
import SkillsSection from "@/components/user/SkillsSection";
import { Box } from "@mui/material";

export default function PublicPage() {
  return (    
      <Box>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
      </Box>    
  );
}
