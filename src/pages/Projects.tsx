import { useEffect, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { useI18n } from "../contexts/I18nContext";
import "./styles/projects.css";

type Media = {
  type: "image" | "video";
  src: string;
  alt: string;
};
export interface ProjectInterface {
  id: number;
  name: string;
  status: string;
  label: "frontend" | "backend" | "fullstack" | "electronics";
  statusColor: "yellow" | "red" | "green";
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  links: { label: string; url: string }[];
  media: Media[];
}

type Props = {
  onProjectOpen: React.Dispatch<React.SetStateAction<ProjectInterface | null>>;
};

export function Projects({ onProjectOpen }: Props) {
  const { t } = useI18n();

  const commandText = t("projects.command");
  const title = t("projects.title");
  const projectsList: ProjectInterface[] = t(`projects.list`, {
    returnObjects: true,
  });

  const [displayCommand, setDisplayCommand] = useState("");

  // Animación typing para el comando
  useEffect(() => {
    let timeout: number;
    let index = 0;

    const type = () => {
      setDisplayCommand(commandText.slice(0, index));
      index++;
      if (index <= commandText.length) {
        timeout = setTimeout(type, 120);
      } else {
        timeout = setTimeout(() => {
          index = 0;
          type();
        }, 10000);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [commandText]);

  return (
    <section className="section">
      <div className="command">
        <span>~$ {displayCommand}</span>
        <span className="cursor"></span>
      </div>

      <div className="section-header project">
        <h2>{title}</h2>
        <div className="projects-filters-placeholder">
          {/* Aquí luego irán filtros y búsqueda */}
          {/* <button>filtros</button> */}
        </div>
      </div>

      <div className="separator project" />

      <div className="projects-list scrollable-container">
        {projectsList.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onClick={() => onProjectOpen(p)}
          />
        ))}
      </div>
    </section>
  );
}
