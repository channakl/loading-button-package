/**
 * Zero-runtime-dependency styling. The full stylesheet is a single string that
 * is injected into <head> exactly once. Everything is themeable through CSS
 * custom properties (the `--lb-*` tokens), so consumers never have to import a
 * CSS file or configure a bundler.
 *
 * Override globally:
 *   :root { --lb-radius: 4px; --lb-primary: #0f766e; }
 * Or per-instance via inline style / a wrapping class.
 */

const STYLE_ID = "react-loading-button-styles";

export const styles = `
.lb-btn {
  /* ---- Themeable design tokens (override these) ---- */
  --lb-radius: 10px;
  --lb-font: inherit;
  --lb-font-weight: 600;
  --lb-transition: 160ms cubic-bezier(0.4, 0, 0.2, 1);
  --lb-ring: 0 0 0 3px color-mix(in srgb, var(--lb-main) 35%, transparent);
  --lb-loader-size: 1.15em;

  /* Default palette — a deliberate deep indigo, not stock blue. */
  --lb-primary: #4f46e5;
  --lb-primary-hover: #4338ca;
  --lb-primary-active: #3730a3;
  --lb-secondary: #475569;
  --lb-secondary-hover: #334155;
  --lb-secondary-active: #1e293b;
  --lb-success: #059669;
  --lb-success-hover: #047857;
  --lb-success-active: #065f46;
  --lb-danger: #e11d48;
  --lb-danger-hover: #be123c;
  --lb-danger-active: #9f1239;
  --lb-neutral: #52525b;
  --lb-neutral-hover: #3f3f46;
  --lb-neutral-active: #27272a;
  --lb-on-solid: #ffffff;

  /* Per-instance color slots, filled by the color classes below. */
  --lb-main: var(--lb-primary);
  --lb-main-hover: var(--lb-primary-hover);
  --lb-main-active: var(--lb-primary-active);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55em;
  box-sizing: border-box;
  font-family: var(--lb-font);
  font-weight: var(--lb-font-weight);
  line-height: 1;
  border: 1px solid transparent;
  border-radius: var(--lb-radius);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color var(--lb-transition),
    border-color var(--lb-transition), color var(--lb-transition),
    box-shadow var(--lb-transition), transform var(--lb-transition),
    opacity var(--lb-transition);
}
.lb-btn:focus-visible {
  outline: none;
  box-shadow: var(--lb-ring);
}
.lb-btn:active:not(:disabled):not(.lb-loading) {
  transform: translateY(0.5px) scale(0.99);
}
.lb-btn:disabled,
.lb-btn.lb-loading {
  cursor: default;
}
.lb-btn:disabled:not(.lb-loading) {
  opacity: 0.55;
  cursor: not-allowed;
}
.lb-btn.lb-full { width: 100%; }

/* ---- Sizes ---- */
.lb-size-sm { font-size: 13px; padding: 6px 12px; min-height: 30px; }
.lb-size-md { font-size: 14px; padding: 9px 16px; min-height: 38px; }
.lb-size-lg { font-size: 16px; padding: 12px 22px; min-height: 46px; }

/* ---- Color slots ---- */
.lb-color-primary   { --lb-main: var(--lb-primary);   --lb-main-hover: var(--lb-primary-hover);   --lb-main-active: var(--lb-primary-active); }
.lb-color-secondary { --lb-main: var(--lb-secondary); --lb-main-hover: var(--lb-secondary-hover); --lb-main-active: var(--lb-secondary-active); }
.lb-color-success   { --lb-main: var(--lb-success);   --lb-main-hover: var(--lb-success-hover);   --lb-main-active: var(--lb-success-active); }
.lb-color-danger    { --lb-main: var(--lb-danger);    --lb-main-hover: var(--lb-danger-hover);    --lb-main-active: var(--lb-danger-active); }
.lb-color-neutral   { --lb-main: var(--lb-neutral);   --lb-main-hover: var(--lb-neutral-hover);   --lb-main-active: var(--lb-neutral-active); }

/* ---- Variants ---- */
.lb-variant-solid {
  background-color: var(--lb-main);
  color: var(--lb-on-solid);
}
.lb-variant-solid:hover:not(:disabled):not(.lb-loading) { background-color: var(--lb-main-hover); }
.lb-variant-solid.lb-active-press:active:not(:disabled) { background-color: var(--lb-main-active); }

.lb-variant-outline {
  background-color: transparent;
  border-color: color-mix(in srgb, var(--lb-main) 45%, transparent);
  color: var(--lb-main);
}
.lb-variant-outline:hover:not(:disabled):not(.lb-loading) {
  background-color: color-mix(in srgb, var(--lb-main) 8%, transparent);
  border-color: var(--lb-main);
}

.lb-variant-ghost {
  background-color: transparent;
  color: var(--lb-main);
}
.lb-variant-ghost:hover:not(:disabled):not(.lb-loading) {
  background-color: color-mix(in srgb, var(--lb-main) 10%, transparent);
}

.lb-variant-soft {
  background-color: color-mix(in srgb, var(--lb-main) 14%, transparent);
  color: var(--lb-main);
}
.lb-variant-soft:hover:not(:disabled):not(.lb-loading) {
  background-color: color-mix(in srgb, var(--lb-main) 22%, transparent);
}

.lb-variant-link {
  background-color: transparent;
  color: var(--lb-main);
  padding-left: 2px;
  padding-right: 2px;
  min-height: 0;
}
.lb-variant-link:hover:not(:disabled):not(.lb-loading) { text-decoration: underline; }

/* ---- Status color shifts (auto-async) ---- */
.lb-status-success { --lb-main: var(--lb-success); --lb-main-hover: var(--lb-success-hover); }
.lb-status-error   { --lb-main: var(--lb-danger);  --lb-main-hover: var(--lb-danger-hover); }

/* ---- Label / content layout ---- */
.lb-label { display: inline-flex; align-items: center; }
.lb-icon { display: inline-flex; align-items: center; }
/* center & replace keep the button from resizing when the label hides */
.lb-loaderpos-center .lb-label,
.lb-loaderpos-replace .lb-label { visibility: hidden; }
.lb-loaderpos-center .lb-loader,
.lb-loaderpos-replace .lb-loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.lb-sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ================= Loaders ================= */
.lb-loader {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
  width: var(--lb-loader-size);
  height: var(--lb-loader-size);
  flex: none;
}

/* spinner */
.lb-spinner-svg { width: 100%; height: 100%; }
.lb-spinner-track { stroke: currentColor; opacity: 0.25; }
.lb-spinner-head {
  stroke: currentColor;
  stroke-dasharray: 56;
  stroke-dashoffset: 42;
  transform-origin: center;
  animation: lb-spin 0.75s linear infinite;
}
@keyframes lb-spin { to { transform: rotate(360deg); } }

/* dots */
.lb-loader--dots { gap: 0.18em; width: auto; }
.lb-dot {
  width: 0.32em; height: 0.32em;
  border-radius: 50%;
  background: currentColor;
  animation: lb-dot-bounce 1.2s ease-in-out infinite;
}
.lb-dot:nth-child(2) { animation-delay: 0.15s; }
.lb-dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes lb-dot-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-0.35em); opacity: 1; }
}

/* bars */
.lb-loader--bars { gap: 0.14em; width: auto; align-items: flex-end; height: 1em; }
.lb-bar {
  width: 0.18em;
  height: 100%;
  border-radius: 2px;
  background: currentColor;
  transform-origin: bottom;
  animation: lb-bar-scale 1s ease-in-out infinite;
}
.lb-bar:nth-child(2) { animation-delay: 0.12s; }
.lb-bar:nth-child(3) { animation-delay: 0.24s; }
.lb-bar:nth-child(4) { animation-delay: 0.36s; }
@keyframes lb-bar-scale {
  0%, 100% { transform: scaleY(0.4); opacity: 0.6; }
  50% { transform: scaleY(1); opacity: 1; }
}

/* pulse */
.lb-loader--pulse { position: relative; }
.lb-pulse-core {
  width: 100%; height: 100%;
  border-radius: 50%;
  background: currentColor;
  animation: lb-pulse 1s ease-in-out infinite;
}
@keyframes lb-pulse {
  0% { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}

/* ring (dual segmented ring) */
.lb-loader--ring { position: relative; }
.lb-ring-seg {
  position: absolute;
  inset: 0;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-color: currentColor transparent transparent transparent;
  animation: lb-ring 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
.lb-ring-seg:nth-child(1) { animation-delay: -0.42s; }
.lb-ring-seg:nth-child(2) { animation-delay: -0.28s; }
.lb-ring-seg:nth-child(3) { animation-delay: -0.14s; }
@keyframes lb-ring { to { transform: rotate(360deg); } }

/* progress (indeterminate sliding bar) */
.lb-loader--progress {
  width: 2.4em;
  height: 0.28em;
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in srgb, currentColor 25%, transparent);
}
.lb-progress-fill {
  display: block;
  width: 40%;
  height: 100%;
  border-radius: inherit;
  background: currentColor;
  animation: lb-progress 1.1s ease-in-out infinite;
}
@keyframes lb-progress {
  0% { transform: translateX(-120%); }
  100% { transform: translateX(320%); }
}

/* success / error glyphs */
.lb-glyph {
  width: var(--lb-loader-size);
  height: var(--lb-loader-size);
  stroke: currentColor;
  stroke-width: 2.5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lb-glyph path { stroke-dasharray: 24; stroke-dashoffset: 24; animation: lb-draw 0.4s ease forwards; }
@keyframes lb-draw { to { stroke-dashoffset: 0; } }

/* Respect reduced-motion: swap animations for a calm fade. */
@media (prefers-reduced-motion: reduce) {
  .lb-spinner-head, .lb-dot, .lb-bar, .lb-pulse-core,
  .lb-ring-seg, .lb-progress-fill {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
  .lb-loader { animation: lb-fade 1.2s ease-in-out infinite; }
  .lb-glyph path { animation: none; stroke-dashoffset: 0; }
}
@keyframes lb-fade { 50% { opacity: 0.35; } }
`;

let injected = false;

/** Inject the stylesheet once. Safe to call repeatedly and during SSR. */
export function injectStyles() {
  if (injected) return;
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) {
    injected = true;
    return;
  }
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = styles;
  document.head.appendChild(el);
  injected = true;
}

/** Returns the raw CSS string, e.g. for server-side style extraction. */
export function getStyles() {
  return styles;
}
