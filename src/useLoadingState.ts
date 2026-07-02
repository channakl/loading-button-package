import * as React from "react";
import type { ButtonStatus } from "./types";

interface Options {
  /** Controlled loading value, or undefined for uncontrolled. */
  controlledLoading?: boolean;
  /** Whether to auto-manage loading from an async onClick. */
  autoLoading: boolean;
  /** Whether to flash success/error after an async action. */
  showStatus: boolean;
  /** How long success/error stays visible, in ms. */
  statusDuration: number;
  /** The user's click handler. */
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<unknown>;
}

interface Result {
  status: ButtonStatus;
  isLoading: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Centralizes the two control modes:
 *   1. Controlled — `controlledLoading` is a boolean; we mirror it.
 *   2. Uncontrolled — we watch the onClick return value; if it's a Promise
 *      we flip to "loading" and then to "success"/"error" when it settles.
 */
export function useLoadingState({
  controlledLoading,
  autoLoading,
  showStatus,
  statusDuration,
  onClick,
}: Options): Result {
  const isControlled = controlledLoading !== undefined;

  const [internal, setInternal] = React.useState<ButtonStatus>("idle");
  const mounted = React.useRef(true);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const status: ButtonStatus = isControlled
    ? controlledLoading
      ? "loading"
      : "idle"
    : internal;

  const flash = React.useCallback(
    (next: "success" | "error") => {
      if (!mounted.current) return;
      if (!showStatus) {
        setInternal("idle");
        return;
      }
      setInternal(next);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        if (mounted.current) setInternal("idle");
      }, statusDuration);
    },
    [showStatus, statusDuration]
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!onClick) return;

      // Controlled mode: parent owns loading, just forward the event.
      if (isControlled || !autoLoading) {
        onClick(event);
        return;
      }

      const result = onClick(event);

      // Only manage state if the handler actually returned a thenable.
      if (result && typeof (result as PromiseLike<unknown>).then === "function") {
        if (timer.current) clearTimeout(timer.current);
        setInternal("loading");
        Promise.resolve(result).then(
          () => flash("success"),
          () => flash("error")
        );
      }
    },
    [onClick, isControlled, autoLoading, flash]
  );

  return {
    status,
    isLoading: status === "loading",
    handleClick,
  };
}
