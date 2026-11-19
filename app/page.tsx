import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Technologies from "@/components/Technologies";
import AgenticDevelopment from "@/components/AgenticDevelopment";
import Projects from "@/components/Projects";
import Career from "@/components/Career";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import ExperienceController from "@/components/experience/ExperienceController";
import LanguageProvider from "@/components/i18n/LanguageProvider";
import PortfolioMotion from "@/components/PortfolioMotion";

export default function Home() {
  return <LanguageProvider>
    <ExperienceController />
    <PortfolioMotion />
    <Navigation />
    <main id="main-content">
      <Hero /><About /><Career /><Technologies /><AgenticDevelopment />
      <Projects /><Education /><Contact />
    </main>
  </LanguageProvider>;
}
