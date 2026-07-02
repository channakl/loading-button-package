# loading-button-react

A composable React loading button. The core idea: **button style and loading animation are two independent axes** — mix any variant with any loader.

- 🎨 **5 variants** × **6 loaders** — freely combinable
- ⚡ **Two control modes** — a controlled `loading` prop *or* auto-managed from an async `onClick`
- ✅ **Success / error states** — flash a checkmark or ✕ when an async action settles
- 🪶 **Zero runtime dependencies** — CSS is injected once, themed entirely with CSS variables (no CSS import, no bundler config)
- ♿ **Accessible** — `aria-busy`, disabled-while-loading, screen-reader status, and no layout shift
- 🌓 **Respects `prefers-reduced-motion`**

## Install

```bash
npm i loading-button-react
```

React 17, 18, or 19 (declared as a peer dependency).

## Quick start

```jsx
import { LoadingButton } from "loading-button-react";

// Auto-managed: return a Promise and the button handles the rest,
// including a success ✓ / error ✕ flash.
<LoadingButton onClick={() => api.save()}>Save changes</LoadingButton>
```

```jsx
// Controlled: you own the loading state.
<LoadingButton loading={isSubmitting} variant="outline" loader="dots">
  Submit
</LoadingButton>
```

## The two axes

Any `variant` composes with any `loader`:

```jsx
<LoadingButton variant="solid"   loader="spinner"  loading />
<LoadingButton variant="outline" loader="dots"     loading />
<LoadingButton variant="ghost"   loader="bars"     loading />
<LoadingButton variant="soft"    loader="ring"     loading />
<LoadingButton variant="link"    loader="progress" loading />
```

| `variant` | `color`     | `loader`  | `loaderPosition` |
| --------- | ----------- | --------- | ---------------- |
| `solid`   | `primary`   | `spinner` | `start`          |
| `outline` | `secondary` | `dots`    | `end`            |
| `ghost`   | `success`   | `bars`    | `center`         |
| `soft`    | `danger`    | `pulse`   | `replace`        |
| `link`    | `neutral`   | `ring`    |                  |
|           |             | `progress`|                  |

## Props

| Prop             | Type                                        | Default     | Notes                                                        |
| ---------------- | ------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `variant`        | `ButtonVariant`                             | `"solid"`   | Visual style                                                 |
| `color`          | `ButtonColor`                               | `"primary"` | Semantic color                                               |
| `size`           | `"sm" \| "md" \| "lg"`                      | `"md"`      |                                                              |
| `loader`         | `LoaderType`                                | `"spinner"` | Animation                                                    |
| `loaderPosition` | `"start" \| "end" \| "center" \| "replace"` | `"start"`   | `center`/`replace` preserve width (no layout shift)          |
| `loading`        | `boolean`                                   | —           | Controlled mode. Omit to auto-manage from async `onClick`.   |
| `autoLoading`    | `boolean`                                   | `true`      | Auto-toggle when `onClick` returns a Promise (uncontrolled)  |
| `showStatus`     | `boolean`                                   | `true`      | Flash success/error after an async action                    |
| `statusDuration` | `number`                                    | `1600`      | How long the status stays visible (ms)                       |
| `loadingText`    | `ReactNode`                                 | —           | Label while loading (falls back to children)                 |
| `successText`    | `ReactNode`                                 | —           | Label on success                                             |
| `errorText`      | `ReactNode`                                 | —           | Label on error                                               |
| `startIcon` / `endIcon` | `ReactNode`                          | —           | Icons shown when idle                                        |
| `fullWidth`      | `boolean`                                   | `false`     |                                                              |

All other native `<button>` props (`disabled`, `type`, `onClick`, `aria-*`, …) pass through.

## Theming

Override any token with CSS custom properties — globally or scoped:

```css
:root {
  --lb-radius: 4px;
  --lb-primary: #0f766e;
  --lb-primary-hover: #0d5f5a;
  --lb-font-weight: 700;
}
```

Full token list lives in `src/styles.js`.

## Async & status behavior

In uncontrolled mode, if `onClick` returns a Promise the button:

1. enters `loading` (disabled, `aria-busy`),
2. on resolve → flashes success (green + ✓),
3. on reject → flashes error (red + ✕),
4. returns to idle after `statusDuration`.

If `onClick` is synchronous, nothing is auto-managed — it behaves like a normal button.

## SSR

Styles inject on the client automatically. For server-rendered style extraction, `getStyles()` returns the raw CSS string and `injectStyles()` injects it manually.

## Building from source

```bash
npm install
npm run build      # → dist/ (ESM + CJS)
```

## License

MIT
