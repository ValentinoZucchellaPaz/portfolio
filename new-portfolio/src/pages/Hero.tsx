import { useState, useEffect } from "react";
import { useI18n } from "../contexts/I18nContext";
import "./styles/hero.css";

const TYPING_INTERVAL = 120; // ms por letra
const REPEAT_DELAY = 10000; // 10s

export function Hero() {
  const { t } = useI18n();

  const command = t("hero.command");
  const fullName = t("hero.name");
  const subtitle = t("hero.subtitle");
  const description = t("hero.description");
  const invite = t("hero.invite");

  const [displayCommand, setDisplayCommand] = useState("");

  // Animación typing
  useEffect(() => {
    let timeout: number;
    let index = 0;

    const type = () => {
      setDisplayCommand(command.slice(0, index));
      index++;
      if (index <= command.length) {
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
  }, [fullName]);

  return (
    <section className="section hero">
      <div className="command">
        <span>~$ {displayCommand}</span>
        <span className="cursor"></span>
      </div>

      <div className="section-header">
        <img src="/profile.jpeg" alt={fullName} className="hero-photo" />

        <div className="hero-name-block">
          <h1 className="hero-name">{fullName}</h1>
          <h2 className="hero-subtitle">{subtitle}</h2>
        </div>
      </div>

      <div className="separator" />

      <p className="hero-description">{description}</p>

      <div className="hero-invite">{invite}</div>
    </section>
  );
}
