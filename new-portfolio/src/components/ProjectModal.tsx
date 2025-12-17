import { useEffect } from "react";
import type { FC } from "react";
import type { ProjectInterface } from "../pages/Projects";
import "./styles/projectModal.css";

type Props = {
  project: ProjectInterface;
  onClose: () => void;
};

export const ProjectModal: FC<Props> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>{project.name}</h2>
        <p>{project.longDescription}</p>

        <div className="modal-links">
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}
        </div>

        {project.media.length > 0 && (
          <div className="modal-gallery">
            {project.media.map((m) => (
              <img key={m} src={`/projects/${m}`} alt={project.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
