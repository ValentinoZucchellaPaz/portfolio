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
  const lastActiveIndexRef = useRef<number>(activeTab);
  const lastValidScrollLeftRef = useRef<number | null>(null);

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
    let isScrolling = false;

    const handleScrollEnd = () => {
      const childWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;

      // Página más cercana
      const newIndex = Math.round(scrollLeft / childWidth);
      const currentIndex = lastActiveIndexRef.current;

      // Detectar si se superó el umbral (más de 1 página)
      const pageDifference = Math.abs(newIndex - currentIndex);

      let finalIndex = newIndex;

      if (pageDifference > 1) {
        // Bloquear: solo permitir cambio de 1 página
        const targetIndex = currentIndex + (newIndex > currentIndex ? 1 : -1);
        finalIndex = Math.max(0, Math.min(children.length - 1, targetIndex));
      }
      // Cambio normal (1 página o menos)
      if (onTabChange) onTabChange(finalIndex);

      container.scrollTo({
        left: finalIndex * childWidth,
        behavior: "smooth",
      });

      lastActiveIndexRef.current = finalIndex;
      lastValidScrollLeftRef.current = finalIndex * childWidth;
      isScrolling = false;
    };

    const onScroll = () => {
      const childWidth = container.clientWidth;

      if (!isScrolling) {
        isScrolling = true;
        // Inicializar posición válida basada en el índice actual
        // Esto asegura que el límite se calcule desde una posición válida
        const currentIndex = lastActiveIndexRef.current;
        lastValidScrollLeftRef.current = currentIndex * childWidth;
      }

      const currentScrollLeft = container.scrollLeft;
      const lastValidScrollLeft = lastValidScrollLeftRef.current ?? 0;

      // Calcular el desplazamiento desde la última posición válida
      const scrollDelta = currentScrollLeft - lastValidScrollLeft;
      const maxScrollDelta = childWidth; // Máximo 1 página

      // Si se supera el límite, limitar el scroll
      if (Math.abs(scrollDelta) > maxScrollDelta) {
        const direction = scrollDelta > 0 ? 1 : -1;
        const limitedScrollLeft =
          lastValidScrollLeft + direction * maxScrollDelta;
        const maxScrollLeft = (children.length - 1) * childWidth;

        // Forzar el scroll a la posición límite (sin animación para que sea inmediato)
        const clampedScrollLeft = Math.max(
          0,
          Math.min(limitedScrollLeft, maxScrollLeft)
        );
        container.scrollLeft = clampedScrollLeft;
      }

      clearTimeout(timeout);
      timeout = setTimeout(handleScrollEnd, 100); // 100ms después de soltar
    };

    container.addEventListener("scroll", onScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, [onTabChange, children.length]);

  // Actualizar la referencia cuando activeTab cambia externamente
  useEffect(() => {
    lastActiveIndexRef.current = activeTab;
    const container = containerRef.current;
    if (container) {
      const childWidth = container.clientWidth;
      lastValidScrollLeftRef.current = activeTab * childWidth;
    }
  }, [activeTab]);

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
