import * as React from "react";
import type { LoaderType } from "../types";

export interface LoaderProps {
  type: LoaderType;
  /** px size of the loader box; defaults to inheriting from font size via em. */
  size?: number | string;
  className?: string;
}

/**
 * Renders one of six loading animations. Purely presentational and color-
 * agnostic — it inherits `currentColor`, so the button controls the color.
 * All motion is CSS-driven (see styles.ts) and respects reduced-motion.
 */
export function Loader({ type, size, className }: LoaderProps) {
  const style =
    size != null
      ? ({ ["--lb-loader-size" as string]: typeof size === "number" ? `${size}px` : size } as React.CSSProperties)
      : undefined;

  const cls = ["lb-loader", `lb-loader--${type}`, className]
    .filter(Boolean)
    .join(" ");

  switch (type) {
    case "dots":
      return (
        <span className={cls} style={style} aria-hidden="true">
          <span className="lb-dot" />
          <span className="lb-dot" />
          <span className="lb-dot" />
        </span>
      );

    case "bars":
      return (
        <span className={cls} style={style} aria-hidden="true">
          <span className="lb-bar" />
          <span className="lb-bar" />
          <span className="lb-bar" />
          <span className="lb-bar" />
        </span>
      );

    case "pulse":
      return (
        <span className={cls} style={style} aria-hidden="true">
          <span className="lb-pulse-core" />
        </span>
      );

    case "ring":
      return (
        <span className={cls} style={style} aria-hidden="true">
          <span className="lb-ring-seg" />
          <span className="lb-ring-seg" />
          <span className="lb-ring-seg" />
          <span className="lb-ring-seg" />
        </span>
      );

    case "progress":
      return (
        <span className={cls} style={style} aria-hidden="true">
          <span className="lb-progress-fill" />
        </span>
      );

    case "spinner":
    default:
      return (
        <span className={cls} style={style} aria-hidden="true">
          <svg viewBox="0 0 24 24" className="lb-spinner-svg">
            <circle
              className="lb-spinner-track"
              cx="12"
              cy="12"
              r="9"
              fill="none"
              strokeWidth="3"
            />
            <circle
              className="lb-spinner-head"
              cx="12"
              cy="12"
              r="9"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );
  }
}
