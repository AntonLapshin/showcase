import { demoShowcaseFiles } from "../showcases";
import { useShowcase } from "../viewModels/useShowcase";

/**
 * The showcase gallery (plan.md §19.2) — a thin, dumb view.
 *
 * Renders the 4-cell layout (sidebar header / breadcrumbs / sidebar nav /
 * canvas) and delegates all decisions to the `useShowcase` view model, which
 * in turn delegates to the pure `src/core` engine. No business logic lives
 * here.
 */
export function Showcase() {
  const { registry, state, selectedComponent, select, toggleExpand } =
    useShowcase(demoShowcaseFiles);
  const { selection, expanded } = state;
  const Selected = selectedComponent;

  return (
    <div className="grid h-screen w-full grid-cols-[16rem_1fr] grid-rows-[auto_1fr] bg-slate-100">
      {/* Cell 1 — sidebar header */}
      <header className="border-b border-r border-slate-200 bg-white px-4 py-3">
        <h1 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Showcases
        </h1>
      </header>

      {/* Cell 2 — breadcrumbs: file / variant path */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <h2 className="text-sm font-medium text-slate-700">
          {selection.file && selection.showcase
            ? `${selection.file} / ${selection.showcase}`
            : "Select a showcase"}
        </h2>
      </header>

      {/* Cell 3 — sidebar nav: expandable file groups */}
      <nav className="overflow-y-auto border-r border-slate-200 bg-white p-2">
        {registry.files.map((file) => {
          const isExpanded = expanded === file.name;
          return (
            <div key={file.name}>
              <button
                type="button"
                onClick={() => toggleExpand(file.name)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <span>{file.name}</span>
                <span className="text-slate-400">{isExpanded ? "▾" : "▸"}</span>
              </button>
              {isExpanded && (
                <ul className="ml-3 border-l border-slate-200 pl-2">
                  {Object.keys(file.showcases).map((variantName) => {
                    const isActive =
                      selection.file === file.name &&
                      selection.showcase === variantName;
                    return (
                      <li key={variantName}>
                        <button
                          type="button"
                          onClick={() => select(file.name, variantName)}
                          className={`w-full rounded-md px-3 py-1.5 text-left text-sm ${
                            isActive
                              ? "bg-indigo-50 font-medium text-indigo-700"
                              : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {variantName}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {/* Cell 4 — canvas: renders the selected variant, anchored top-left */}
      <main className="overflow-auto p-8">
        {Selected ? (
          <Selected />
        ) : (
          <p className="text-sm text-slate-400">
            Select a showcase from the list to preview it.
          </p>
        )}
      </main>
    </div>
  );
}
