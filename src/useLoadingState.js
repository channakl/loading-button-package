import * as React from "react";

/**
 * Centralizes the two control modes:
 *   1. Controlled — `controlledLoading` is a boolean; we mirror it.
 *   2. Uncontrolled — we watch the onClick return value; if it's a Promise
 *      we flip to "loading" and then to "success"/"error" when it settles.
 *
 * @param {Object} options
 * @param {boolean} [options.controlledLoading] - Controlled loading value, or undefined for uncontrolled.
 * @param {boolean} options.autoLoading - Whether to auto-manage loading from an async onClick.
 * @param {boolean} options.showStatus - Whether to flash success/error after an async action.
 * @param {number} options.statusDuration - How long success/error stays visible, in ms.
 * @param {Function} [options.onClick] - The user's click handler.
 * @returns {{ status: string, isLoading: boolean, handleClick: Function }}
 */
export function useLoadingState({
  controlledLoading,
  autoLoading,
  showStatus,
  statusDuration,
  onClick,
}) {
  const isControlled = controlledLoading !== undefined;

  const [internal, setInternal] = React.useState("idle");
  const mounted = React.useRef(true);
  const timer = React.useRef(null);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const status = isControlled
    ? controlledLoading
      ? "loading"
      : "idle"
    : internal;

  const flash = React.useCallback(
    (next) => {
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
    (event) => {
      if (!onClick) return;

      // Controlled mode: parent owns loading, just forward the event.
      if (isControlled || !autoLoading) {
        onClick(event);
        return;
      }

      const result = onClick(event);

      // Only manage state if the handler actually returned a thenable.
      if (result && typeof result.then === "function") {
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
