import { useEffect, useState } from "react";
import { useI18n } from "../contexts/I18nContext";
import "./styles/stack.css";

const TYPING_INTERVAL = 120;
const REPEAT_DELAY = 10000;

export function TechStack() {
  const { t } = useI18n();

  const commandText = t("stack.command");
  const title = t("stack.title");
  const stack: { title: string; skills: string[] }[] = t("stack.content", {
    returnObjects: true,
  });

  const [displayCommand, setDisplayCommand] = useState("");

  // typing animation
  useEffect(() => {
    let timeout: number;
    let index = 0;

    const type = () => {
      setDisplayCommand(commandText.slice(0, index));
      index++;

      if (index <= commandText.length) {
        timeout = setTimeout(type, TYPING_INTERVAL);
      } else {
        timeout = setTimeout(() => {
          index = 0;
          type();
        }, REPEAT_DELAY);
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

      <div className="section-header">
        <h2>{title}</h2>
      </div>

      <div className="separator" />

      <div className="scrollable-container">
        {stack.map(({ title, skills }) => (
          <StackGroup title={title} skills={skills} />
        ))}
      </div>
    </section>
  );
}

function StackGroup({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="stack-block">
      <h3 className="stack-block-title">// {title}</h3>

      <ul className="stack-list">
        {skills.map((skill) => (
          <li key={skill} className="stack-item">
            <span>{"> "}</span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
