import { Box } from "@mui/material";

import Section from "@/components/public/Section";
import HeroSection from "@/components/user/HeroSection";
import SkillsSection from "@/components/user/SkillsSection";
import ExperienceSection from "@/components/user/ExperienceSection";
import ProjectsSection from "@/components/user/ProjectsSection";
import ContactSection from "@/components/user/ContactSection";

export default function PublicPage() {
  return (
    <Box>
      <Section id="hero">
        <HeroSection />
      </Section>

      <Section id="skills">
        <SkillsSection />
      </Section>

      <Section id="experience">
        <ExperienceSection />
      </Section>

      <Section id="projects">
        <ProjectsSection />
      </Section>

      <Section id="contact">
        <ContactSection />
      </Section>
    </Box>
  );
}
