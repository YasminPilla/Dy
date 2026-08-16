import { useEffect, useRef } from "react";

/** Barra fina no topo mostrando o quanto da página já foi lido. */
export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    let frame = null;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const max = scrollHeight - clientHeight;
        const pct = max > 0 ? (scrollTop / max) * 100 : 0;
        if (ref.current) ref.current.style.width = `${pct}%`;
        frame = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={ref} className="scroll-progress-bar" />
    </div>
  );
}
