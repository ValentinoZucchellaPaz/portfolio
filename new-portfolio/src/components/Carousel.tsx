import { useRef, useEffect } from "react";
import type { ReactNode } from "react";
import "./styles/carousel.css";

type CarouselProps = {
  activeTab: number;
  disable: boolean;
  onTabChange?: (index: number) => void;
  children: ReactNode[];
};

export function Carousel({
  activeTab,
  disable,
  onTabChange,
  children,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll automático cuando cambia activeTab
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const childWidth = container.clientWidth;
    container.scrollTo({
      left: childWidth * activeTab,
      behavior: "smooth",
    });
  }, [activeTab]);

  // Snap programático al soltar scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeout: ReturnType<typeof setTimeout> | undefined;

    const handleScrollEnd = () => {
      const childWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;

      // Página más cercana
      const newIndex = Math.round(scrollLeft / childWidth);

      if (onTabChange) onTabChange(newIndex);

      // Ajuste final para snap exacto
      container.scrollTo({
        left: newIndex * childWidth,
        behavior: "smooth",
      });
    };

    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScrollEnd, 100); // 100ms después de soltar
    };

    container.addEventListener("scroll", onScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, [onTabChange]);

  const handlePrev = () => {
    if (onTabChange) onTabChange(Math.max(0, activeTab - 1));
  };

  const handleNext = () => {
    if (onTabChange) onTabChange(Math.min(children.length - 1, activeTab + 1));
  };

  return (
    <div className="carousel-wrapper">
      {activeTab != 0 && (
        <button className="carousel-btn left" onClick={handlePrev}>
          ◀
        </button>
      )}

      <div
        className={`carousel-container ${disable ? "disable" : ""}`}
        ref={containerRef}
      >
        {children.map((child, i) => (
          <div key={i} className="carousel-item">
            {child}
          </div>
        ))}
      </div>

      {activeTab != children.length - 1 && (
        <button className="carousel-btn right" onClick={handleNext}>
          ▶
        </button>
      )}

      <div className="carousel-indicators">
        {children.map((_, i) => (
          <span
            key={i}
            className={`indicator ${i === activeTab ? "active" : ""}`}
            onClick={() => onTabChange && onTabChange(i)}
          />
        ))}
      </div>
    </div>
  );
}
