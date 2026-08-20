import { DemoPanel } from "./ui/components/DemoPanel";

/**
 * App root.
 *
 * Just composes the (dumb) demo panel, passing the project identity down from
 * the scaffold context. No business logic here — that lives in `src/core`.
 */
export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full">
        <DemoPanel
          projectName="showcase"
          owner="AntonLapshin"
          repo="showcase"
          description="Implement a new project called Showcase, it's a lightweight alternative to Storybook. It's already implemented in ws/natalies-corner/web project. Your goal is to extract it into a standalone git repository, polish it, create a demo (github page), README and prepare a package for npm publishing (I'll publish it manually)."
        />
      </div>
    </main>
  );
}
