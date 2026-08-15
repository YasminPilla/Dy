/** Botão circular padrão do site: texto + disco com seta. */
export default function CircleButton({
  href,
  onClick,
  variant = "ghost", // "blue" | "ghost"
  direction = "right", // "right" | "down"
  type,
  disabled,
  children,
}) {
  const cls = `btn btn--${variant}${direction === "down" ? " btn--down" : ""}`;
  const arrow =
    direction === "down" ? (
      <path d="M8 2v11M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.5" />
    ) : (
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" />
    );
  const inner = (
    <>
      {children}
      <span className="circ">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{arrow}</svg>
      </span>
    </>
  );
  return href ? (
    <a className={cls} href={href} onClick={onClick}>{inner}</a>
  ) : (
    <button className={cls} type={type || "button"} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}
