import type { ReactNode } from "react";
import "./styles/button.css";

type Props = {
  href: string;
  children: ReactNode;
};

export const LinkButton = ({ href, children }: Props) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="pressable-btn"
    >
      <span className="pressable-btn__face">{children}</span>
    </a>
  );
};

export const Button = ({ children }: { children: ReactNode }) => {
  return (
    <button className="pressable-btn">
      <span className="pressable-btn__face">{children}</span>
    </button>
  );
};
