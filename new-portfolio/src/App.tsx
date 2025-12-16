import { useState } from "react";
import { Header } from "./components/Header";
// import { Carousel } from "./components/Carousel";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="app-root">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app-content">
        {/* <Carousel activeTab={activeTab}>
          <Hero />
          <Projects />
          <Stack />
          <Contact />
        </Carousel> */}
      </main>
    </div>
  );
}
