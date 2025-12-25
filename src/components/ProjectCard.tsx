import type { FC } from "react";
import "./styles/projectCard.css";
import type { ProjectInterface } from "../pages/Projects";

type Props = {
  project: ProjectInterface;
  onClick: () => void;
};

export const ProjectCard: FC<Props> = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-card-header">
        <h3 className="project-name">{project.name}</h3>
        <div className={`project-chip ${project.statusColor}`}>
          {project.label}
        </div>
      </div>
      <p className="project-short">{project.shortDescription}</p>
      <div className="project-techs">
        {project.technologies.map((tech) => (
          <span key={tech} className="project-tech">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
