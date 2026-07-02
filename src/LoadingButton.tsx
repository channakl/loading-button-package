import * as React from "react";
import type { LoadingButtonProps } from "./types";
import { Loader } from "./loaders/Loader";
import { injectStyles } from "./styles";
import { useLoadingState } from "./useLoadingState";

// Ensure styles exist as early as the module is used on the client.
injectStyles();

function StatusGlyph({ status }: { status: "success" | "error" }) {
  return (
    <svg className="lb-glyph" viewBox="0 0 24 24" aria-hidden="true">
      {status === "success" ? (
        <path d="M5 13l4 4L19 7" />
      ) : (
        <path d="M7 7l10 10M17 7L7 17" />
      )}
    </svg>
  );
}

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>(function LoadingButton(
  {
    variant = "solid",
    color = "primary",
    size = "md",
    loader = "spinner",
    loaderPosition = "start",
    loading,
    autoLoading = true,
    showStatus = true,
    statusDuration = 1600,
    loadingText,
    successText,
    errorText,
    fullWidth = false,
    startIcon,
    endIcon,
    onClick,
    disabled,
    className,
    children,
    type = "button",
    ...rest
  },
  ref
) {
  injectStyles();

  const { status, isLoading, handleClick } = useLoadingState({
    controlledLoading: loading,
    autoLoading,
    showStatus,
    statusDuration,
    onClick,
  });

  const showIndicator = status !== "idle";

  // Pick the label for the current status.
  let label: React.ReactNode = children;
  if (status === "loading" && loadingText != null) label = loadingText;
  else if (status === "success" && successText != null) label = successText;
  else if (status === "error" && errorText != null) label = errorText;

  // The indicator (loader or status glyph) that occupies the icon slot.
  const indicator = isLoading ? (
    <Loader type={loader} />
  ) : status === "success" || status === "error" ? (
    <StatusGlyph status={status} />
  ) : null;

  const beside =
    showIndicator &&
    (loaderPosition === "start" || loaderPosition === "end");

  const classes = [
    "lb-btn",
    `lb-variant-${variant}`,
    `lb-color-${color}`,
    `lb-size-${size}`,
    variant === "solid" ? "lb-active-press" : "",
    fullWidth ? "lb-full" : "",
    isLoading ? "lb-loading" : "",
    status === "success" ? "lb-status-success" : "",
    status === "error" ? "lb-status-error" : "",
    showIndicator ? `lb-loaderpos-${loaderPosition}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const srMessage =
    status === "loading"
      ? "Loading"
      : status === "success"
      ? "Done"
      : status === "error"
      ? "Failed"
      : "";

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      aria-live={showStatus ? "polite" : undefined}
      onClick={handleClick}
      {...rest}
    >
      {/* start icon / start-positioned indicator */}
      {beside && loaderPosition === "start" ? (
        <span className="lb-icon">{indicator}</span>
      ) : (
        !showIndicator &&
        startIcon && <span className="lb-icon">{startIcon}</span>
      )}

      {/* centered / replacing indicator sits absolutely (see CSS) */}
      {showIndicator &&
        (loaderPosition === "center" || loaderPosition === "replace") &&
        indicator}

      <span className="lb-label">{label}</span>

      {beside && loaderPosition === "end" ? (
        <span className="lb-icon">{indicator}</span>
      ) : (
        !showIndicator && endIcon && <span className="lb-icon">{endIcon}</span>
      )}

      <span className="lb-sr-only" role="status">
        {srMessage}
      </span>
    </button>
  );
});
