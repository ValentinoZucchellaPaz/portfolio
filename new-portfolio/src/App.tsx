import { useState } from "react";
import { Header } from "./components/Header";
import { Carousel } from "./components/Carousel";
import "./App.css";
import { Hero } from "./pages/Hero";
import { Projects, type ProjectInterface } from "./pages/Projects";
import { TechStack } from "./pages/TechStack";
import { Contact } from "./pages/Contact";
import { ProjectDetailOverlay } from "./components/ProjectDetailedOverlay";
import { useI18n } from "./contexts/I18nContext";

export default function App() {
  const { lang, setLang } = useI18n();
  const [activeTab, setActiveTab] = useState(0);
  const [activeProject, setActiveProject] = useState<ProjectInterface | null>(
    null
  );

  return (
    <div className="app-root">
      <Header
        activeTab={activeTab}
        onTabChange={(n) => {
          setActiveProject(null);
          setActiveTab(n);
        }}
        toggleLang={() => {
          setLang(lang === "es" ? "en" : "es");
          setActiveProject(null);
        }}
      />

      <main className="app-content">
        <Carousel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          disable={!!activeProject}
        >
          <Hero />
          <Projects onProjectOpen={setActiveProject} />
          <TechStack />
          <Contact />
        </Carousel>

        {activeProject && (
          <ProjectDetailOverlay
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </main>
    </div>
  );
}
