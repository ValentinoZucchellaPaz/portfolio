import { useEffect, useState } from "react";
import type { ProjectInterface } from "../pages/Projects";
import { LinkButton } from "./Button";
import "yet-another-react-lightbox/styles.css";
import "./styles/projectDetail.css";
import Lightbox from "yet-another-react-lightbox";
import type { SlideImage, SlideVideo } from "yet-another-react-lightbox";
import { Video } from "yet-another-react-lightbox/plugins";

type Props = {
  project: ProjectInterface;
  onClose: () => void;
};

export function ProjectDetailOverlay({ project, onClose }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const media = project.media;
  const slides: (SlideImage | SlideVideo)[] = media.map((item) =>
    item.type === "image"
      ? { src: item.src, alt: item.alt }
      : {
          type: "video",
          sources: [{ src: item.src, type: "video/mp4" }],
        }
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="project-detail-overlay">
      <button className="close" onClick={onClose}>
        ✕
      </button>

      <div className="project-detail-content">
        <header className="project-detail-header">
          <h2>{project.name}</h2>
          <span className={`status ${project.statusColor}`}>
            {project.status}
          </span>
        </header>

        <section className="project-detail-section">
          <h3>// descripción</h3>
          <p className="project-detail-description">
            {project.longDescription}
          </p>
          <div className="project-techs">
            {project.technologies.map((tech) => (
              <span key={tech} className="project-tech">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {project.links.length > 0 && (
          <section className="project-detail-section">
            <h3>// links</h3>

            <div className="project-detail-links">
              {project.links.map((l) => (
                <LinkButton key={l.label} href={l.url}>
                  {l.label}
                </LinkButton>
              ))}
            </div>
          </section>
        )}

        {project.media.length > 0 && (
          <section className="project-detail-section">
            <h3>// media</h3>

            <div className="project-gallery">
              {media.map((item, index) => (
                <button
                  key={index}
                  className="gallery-item"
                  onClick={() => setLightboxIndex(index)}
                >
                  {item.type === "image" ? (
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  ) : (
                    <video src={item.src} muted playsInline />
                  )}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Video]}
      />
    </div>
  );
}
