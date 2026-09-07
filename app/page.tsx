import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Technologies from "@/components/Technologies";
import AgenticDevelopment from "@/components/AgenticDevelopment";
import Projects from "@/components/Projects";
import PersonalProjects from "@/components/PersonalProjects";
import Career from "@/components/Career";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import SectionRail from "@/components/SectionRail";
import ExperienceCanvas from "@/components/experience/ExperienceCanvas";
import ExperienceController from "@/components/experience/ExperienceController";
import AdaptiveQualityProvider from "@/components/experience/AdaptiveQualityProvider";
import LanguageProvider from "@/components/i18n/LanguageProvider";

export default function Home(){return <LanguageProvider><AdaptiveQualityProvider><ExperienceCanvas/><ExperienceController/><Navigation/><SectionRail/><main id="main-content"><Hero/><About/><Career/><Technologies/><AgenticDevelopment/><Projects/><PersonalProjects/><Education/><Contact/></main></AdaptiveQualityProvider></LanguageProvider>}
