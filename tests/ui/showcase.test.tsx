import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Showcase } from "../../src/ui/components/Showcase";

/**
 * Thin-view interaction tests for the showcase gallery. These verify the UI
 * bindings (sidebar -> view model -> core -> URL) work end to end. Core
 * business logic itself is covered to 100% in tests/core/showcase.test.ts.
 *
 * Canvas assertions are scoped with `within(screen.getByRole("main"))` because
 * variant names also appear in the sidebar nav.
 */

function readSearch(): string {
  return window.location.search;
}

function canvas() {
  return within(screen.getByRole("main"));
}

describe("Showcase gallery (thin UI)", () => {
  beforeEach(() => {
    // Start from a clean URL so deep links don't leak between tests.
    window.history.replaceState({}, "", "/");
  });

  it("renders the sidebar file groups, collapsed by default", () => {
    render(<Showcase />);
    expect(screen.getByRole("heading", { name: "Showcases" })).toBeInTheDocument();
    expect(screen.getByText("Button")).toBeInTheDocument();
    expect(screen.getByText("Spinner")).toBeInTheDocument();
    expect(screen.getByText("Badge")).toBeInTheDocument();
    // Collapsed: variants are not visible until a group is expanded.
    expect(screen.queryByText("Primary")).not.toBeInTheDocument();
  });

  it("expanding a group reveals its variants", () => {
    render(<Showcase />);
    fireEvent.click(screen.getByText("Button"));
    expect(screen.getByText("Primary")).toBeInTheDocument();
    expect(screen.getByText("Secondary")).toBeInTheDocument();
    // Collapse again.
    fireEvent.click(screen.getByText("Button"));
    expect(screen.queryByText("Primary")).not.toBeInTheDocument();
  });

  it("selecting a variant renders it on the canvas and updates the URL", () => {
    render(<Showcase />);
    fireEvent.click(screen.getByText("Button"));
    fireEvent.click(screen.getByText("Primary"));

    // Canvas shows the selected variant's content (scoped to <main>).
    expect(canvas().getByRole("button", { name: "Primary" })).toBeInTheDocument();
    // Breadcrumbs reflect the path.
    expect(screen.getByText("Button / Primary")).toBeInTheDocument();
    // URL is updated (pushState) with both params.
    expect(readSearch()).toContain("file=Button");
    expect(readSearch()).toContain("showcase=Primary");
  });

  it("loading with deep-link params restores the selection", () => {
    window.history.replaceState({}, "", "/?file=Badge&showcase=Success");
    render(<Showcase />);
    expect(screen.getByText("Badge / Success")).toBeInTheDocument();
    // The badge variant content is rendered on the canvas.
    expect(canvas().getByText("Success")).toBeInTheDocument();
  });

  it("popstate re-applies the restored URL", () => {
    render(<Showcase />);
    fireEvent.click(screen.getByText("Button"));
    fireEvent.click(screen.getByText("Primary"));
    expect(screen.getByText("Button / Primary")).toBeInTheDocument();

    // On a real back navigation the browser restores the earlier URL and then
    // fires `popstate`. In jsdom `history.back()` doesn't update location in a
    // way the view model can observe, so model the restored location directly
    // and dispatch popstate exactly as the browser would.
    window.history.replaceState({}, "", "/");
    fireEvent.popState(window);

    // The listener re-applies the now-empty URL: selection clears.
    expect(screen.getByText("Select a showcase")).toBeInTheDocument();
    expect(canvas().queryByText("Primary")).not.toBeInTheDocument();
  });
});
