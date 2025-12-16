import { useState } from "react";
import { Header } from "./components/Header";
import { Carousel } from "./components/Carousel";
import "./App.css";
import { Hero } from "./pages/Hero";
import { Projects } from "./pages/Projects";

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="app-root">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app-content">
        <Carousel activeTab={activeTab} onTabChange={setActiveTab}>
          <Hero />
          <Projects />
          <Hero />
          <Hero />
        </Carousel>
        {/* <Projects />
          <Stack />
          <Contact /> */}
      </main>
    </div>
  );
}
