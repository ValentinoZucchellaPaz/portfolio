import { useEffect, useState } from "react";
import { useI18n } from "../contexts/I18nContext";
import "./styles/contact.css";
import { ChevronRightIcon } from "../components/icons/ChevronRightIcon";

const TYPING_INTERVAL = 120;
const REPEAT_DELAY = 10000;

export function Contact() {
  const { t } = useI18n();

  const commandText = t("contact.command");
  const title = t("contact.title");
  const subtitle = t("contact.subtitle");

  const links: { label: string; value: string; link: string }[] = t(
    "contact.links",
    {
      returnObjects: true,
    }
  );

  const [displayCommand, setDisplayCommand] = useState("");

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
    <section className="section contact">
      <div className="command">
        <span>~$ {displayCommand}</span>
        <span className="cursor" />
      </div>

      <div className="section-header">
        <div>
          <h2>{title}</h2>
          <p className="contact-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="separator" />

      <div className="scrollable-container">
        {links.map(({ label, value, link }) => (
          <ContactCard label={label} value={value} href={link} />
        ))}
      </div>
    </section>
  );
}

function ContactCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <>
      <a
        className="contact-card"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="contact-label">// {label}</div>
        <div className="contact-value">{value}</div>
        <ChevronRightIcon size={15} />
      </a>
    </>
  );
}
