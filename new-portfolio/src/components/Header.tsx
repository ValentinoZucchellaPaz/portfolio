import { useState } from "react";
import { useI18n } from "../contexts/I18nContext";
import { useTheme } from "../contexts/ThemeContext";

type HeaderProps = {
  activeTab: number;
  onTabChange: (index: number) => void;
};

const NAV_KEYS = ["home", "projects", "stack", "contact"] as const;

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const { t, lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const [open, setOpen] = useState(false);

  function toggleLang() {
    setLang(lang === "es" ? "en" : "es");
  }

  function handleTabClick(index: number) {
    onTabChange(index);
    setOpen(false); // clave en mobile
  }

  return (
    <>
      <header className="app-header">
        <button className="icon-btn menu-btn" onClick={() => setOpen(true)}>
          ☰
        </button>

        <h1 className="brand">valentino.z.dev</h1>

        <div className={`nav-wrapper ${open ? "open" : ""}`}>
          <nav className="nav">
            {NAV_KEYS.map((key, index) => (
              <button
                key={key}
                className={`nav-item ${activeTab === index ? "active" : ""}`}
                onClick={() => handleTabClick(index)}
              >
                <span className="prompt">$</span> {t(`nav.${key}`)}
              </button>
            ))}
          </nav>

          <div className="header-controls">
            <button className="icon-btn" onClick={toggleLang}>
              🌐 {lang.toUpperCase()}
            </button>

            <button className="icon-btn" onClick={toggleTheme}>
              {theme === "dark" ? "☀" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
}
