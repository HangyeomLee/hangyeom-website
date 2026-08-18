import { HashRedirect } from "@/components/home/HashRedirect";
import { Hero } from "@/components/home/Hero";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { SideProjectsSection } from "@/components/home/SideProjectsSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { AboutSection } from "@/components/home/AboutSection";

export default function Page() {
  return (
    <>
      <HashRedirect />
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
      <SideProjectsSection />
      <SkillsSection />
      <AboutSection />
    </>
  );
}
