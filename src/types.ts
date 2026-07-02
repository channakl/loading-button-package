import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Visual style of the button — independent of the loading animation. */
export type ButtonVariant = "solid" | "outline" | "ghost" | "soft" | "link";

/** Semantic color of the button. */
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "neutral";

/** Size preset. */
export type ButtonSize = "sm" | "md" | "lg";

/** Loading animation — independent of the button style. */
export type LoaderType =
  | "spinner"
  | "dots"
  | "bars"
  | "pulse"
  | "ring"
  | "progress";

/**
 * Where the loader sits relative to the label.
 * - `start`   spinner before the label
 * - `end`     spinner after the label
 * - `center`  spinner centered, label hidden but width preserved
 * - `replace` label swapped for the loader (width preserved)
 */
export type LoaderPosition = "start" | "end" | "center" | "replace";

/** Transient status shown after an async action resolves. */
export type ButtonStatus = "idle" | "loading" | "success" | "error";

export interface LoadingButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /** Visual style. @default "solid" */
  variant?: ButtonVariant;
  /** Semantic color. @default "primary" */
  color?: ButtonColor;
  /** Size preset. @default "md" */
  size?: ButtonSize;
  /** Loading animation. @default "spinner" */
  loader?: LoaderType;
  /** Loader placement relative to the label. @default "start" */
  loaderPosition?: LoaderPosition;

  /**
   * Controlled loading state. When provided, the button reflects this value
   * and does NOT auto-manage its own state. Leave undefined to let an async
   * `onClick` drive loading automatically.
   */
  loading?: boolean;

  /**
   * When `loading` is undefined and `onClick` returns a Promise, the button
   * automatically enters the loading state until the promise settles.
   * @default true
   */
  autoLoading?: boolean;

  /**
   * Show a transient success/error state after an auto-managed async action
   * settles. Ignored in controlled mode.
   * @default true
   */
  showStatus?: boolean;
  /** How long the success/error state stays visible, in ms. @default 1600 */
  statusDuration?: number;

  /** Label shown while loading. Falls back to children. */
  loadingText?: ReactNode;
  /** Label shown briefly on success. */
  successText?: ReactNode;
  /** Label shown briefly on error. */
  errorText?: ReactNode;

  /** Stretch to the full width of the container. @default false */
  fullWidth?: boolean;
  /** Icon rendered before the label (hidden while loading). */
  startIcon?: ReactNode;
  /** Icon rendered after the label (hidden while loading). */
  endIcon?: ReactNode;

  /**
   * Click handler. May be sync or async. If it returns a Promise and the
   * button is uncontrolled, loading is managed for you.
   */
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<unknown>;

  children?: ReactNode;
}
