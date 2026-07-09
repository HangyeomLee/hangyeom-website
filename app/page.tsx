import { HashRedirect } from "@/components/home/HashRedirect";
import { Hero } from "@/components/home/Hero";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { AboutSection } from "@/components/home/AboutSection";

export default function Page() {
  return (
    <>
      <HashRedirect />
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
      <AboutSection />
    </>
  );
}
