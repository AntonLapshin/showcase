/**
 * Sample showcase file — Button variants.
 *
 * Pure presentational demo: no business logic, just a few styled render
 * variants so the gallery sidebar/canvas interaction is visible in the Pages
 * demo. The `name` constant (a constant export) drives sidebar grouping and
 * URL deep-linking.
 */

export const name = "Button";

export const Primary = () => (
  <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
    Primary
  </button>
);

export const Secondary = () => (
  <button className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
    Secondary
  </button>
);

export const Disabled = () => (
  <button
    disabled
    className="cursor-not-allowed rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-400"
  >
    Disabled
  </button>
);
