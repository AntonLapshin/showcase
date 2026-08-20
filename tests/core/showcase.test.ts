import { describe, it, expect } from "vitest";
import type { ComponentType } from "react";
import {
  EMPTY_SELECTION,
  ShowcaseRegistryError,
  applyUrlPath,
  createShowcaseRegistry,
  createShowcaseState,
  decodeUrlPath,
  encodeUrlPath,
  select,
  toggleExpand,
  validateShowcaseFile,
} from "../../src/core/showcase";
import type {
  ShowcaseComponent,
  ShowcaseFile,
  ShowcaseRegistry,
  ShowcaseState,
} from "../../src/core/showcase";

/** A tiny opaque stand-in for a real variant component. */
const Dummy = (() => ({})) as unknown as ShowcaseComponent;
const Other = (() => ({})) as unknown as ShowcaseComponent;

const buttonFile: ShowcaseFile = {
  name: "Button",
  showcases: { Primary: Dummy, Secondary: Other },
};
const spinnerFile: ShowcaseFile = {
  name: "Spinner",
  showcases: { Small: Dummy, Large: Other },
};

function makeRegistry(): ShowcaseRegistry {
  return createShowcaseRegistry([buttonFile, spinnerFile]);
}

describe("createShowcaseRegistry", () => {
  it("builds a registry with unique files and lookup helpers", () => {
    const reg = makeRegistry();
    expect(reg.files).toHaveLength(2);
    expect(reg.files[0].name).toBe("Button");
    expect(reg.files[1].name).toBe("Spinner");
    expect(reg.fileByName("Button")).toBe(buttonFile);
    expect(reg.fileByName("Nope")).toBeUndefined();
    expect(reg.fileByName(null)).toBeUndefined();
    expect(reg.fileByName(undefined)).toBeUndefined();
  });

  it("looks up variants by file + showcase name", () => {
    const reg = makeRegistry();
    expect(reg.variant("Button", "Primary")).toBe(Dummy);
    expect(reg.variant("Button", "Secondary")).toBe(Other);
    expect(reg.variant("Button", "Missing")).toBeUndefined();
    expect(reg.variant("Nope", "Primary")).toBeUndefined();
    expect(reg.variant("Button", null)).toBeUndefined();
    expect(reg.variant("Button", undefined)).toBeUndefined();
    expect(reg.variant(null, "Primary")).toBeUndefined();
  });

  it("rejects duplicate file names", () => {
    expect(() =>
      createShowcaseRegistry([
        buttonFile,
        { name: "Button", showcases: { X: Dummy } },
      ]),
    ).toThrow(ShowcaseRegistryError);
    expect(() =>
      createShowcaseRegistry([
        buttonFile,
        { name: "Button", showcases: { X: Dummy } },
      ]),
    ).toThrow(/Duplicate showcase file name: "Button"/);
  });

  it("accepts an empty registry (no files)", () => {
    const reg = createShowcaseRegistry([]);
    expect(reg.files).toHaveLength(0);
    expect(reg.fileByName("Anything")).toBeUndefined();
  });
});

describe("validateShowcaseFile", () => {
  it("passes a well-formed file", () => {
    expect(() => validateShowcaseFile(buttonFile)).not.toThrow();
  });

  it("rejects a blank file name", () => {
    expect(() => validateShowcaseFile({ name: "  ", showcases: { X: Dummy } })).toThrow();
    expect(() => validateShowcaseFile({ name: "", showcases: { X: Dummy } })).toThrow();
  });

  it("rejects a file with no variants", () => {
    expect(() =>
      validateShowcaseFile({ name: "Empty", showcases: {} }),
    ).toThrow(/at least one variant/);
  });

  it("rejects a file with a missing showcases map", () => {
    expect(() =>
      validateShowcaseFile({ name: "Empty", showcases: undefined as never }),
    ).toThrow(/at least one variant/);
  });

  it("rejects a variant that is not a component", () => {
    expect(() =>
      validateShowcaseFile({ name: "Bad", showcases: { X: "not-a-component" as never } }),
    ).toThrow(ShowcaseRegistryError);
  });
});

describe("createShowcaseState", () => {
  it("starts empty with nothing selected or expanded", () => {
    const state = createShowcaseState();
    expect(state).toEqual({ selection: EMPTY_SELECTION, expanded: null });
  });
});

describe("select", () => {
  const reg = makeRegistry();

  it("selects a valid file + variant", () => {
    const state = createShowcaseState();
    const next = select(state, reg, "Button", "Primary");
    expect(next.selection).toEqual({ file: "Button", showcase: "Primary" });
    expect(state.selection).toEqual(EMPTY_SELECTION); // input untouched
  });

  it("selects a file with no variant when the variant is unknown", () => {
    const next = select(createShowcaseState(), reg, "Button", "Missing");
    expect(next.selection).toEqual({ file: "Button", showcase: null });
  });

  it("clears selection when the file is unknown", () => {
    const next = select(
      { selection: { file: "Button", showcase: "Primary" }, expanded: "Button" },
      reg,
      "Nope",
      "Primary",
    );
    expect(next.selection).toEqual(EMPTY_SELECTION);
  });

  it("leaves `expanded` untouched", () => {
    const state: ShowcaseState = {
      selection: EMPTY_SELECTION,
      expanded: "Spinner",
    };
    const next = select(state, reg, "Button", "Primary");
    expect(next.expanded).toBe("Spinner");
  });
});

describe("toggleExpand", () => {
  it("expands a collapsed group", () => {
    const next = toggleExpand(createShowcaseState(), "Button");
    expect(next.expanded).toBe("Button");
  });

  it("collapses the already-expanded group", () => {
    const next = toggleExpand(
      { selection: EMPTY_SELECTION, expanded: "Button" },
      "Button",
    );
    expect(next.expanded).toBeNull();
  });

  it("switches to a different group when another is expanded", () => {
    const next = toggleExpand(
      { selection: EMPTY_SELECTION, expanded: "Button" },
      "Spinner",
    );
    expect(next.expanded).toBe("Spinner");
  });

  it("returns a new state without mutating the input", () => {
    const state = createShowcaseState();
    const next = toggleExpand(state, "Button");
    expect(next).not.toBe(state);
    expect(state.expanded).toBeNull();
  });
});

describe("decodeUrlPath", () => {
  it("decodes file + showcase", () => {
    expect(decodeUrlPath({ file: "Button", showcase: "Primary" })).toEqual({
      file: "Button",
      showcase: "Primary",
    });
  });

  it("handles missing or empty params as no selection", () => {
    expect(decodeUrlPath({})).toEqual(EMPTY_SELECTION);
    expect(decodeUrlPath({ file: "Button" })).toEqual(EMPTY_SELECTION);
    expect(decodeUrlPath({ showcase: "Primary" })).toEqual(EMPTY_SELECTION);
    expect(decodeUrlPath({ file: "Button", showcase: "" })).toEqual(EMPTY_SELECTION);
    expect(decodeUrlPath({ file: "", showcase: "Primary" })).toEqual(EMPTY_SELECTION);
    expect(decodeUrlPath({ file: "  ", showcase: "Primary" })).toEqual(EMPTY_SELECTION);
  });
});

describe("encodeUrlPath", () => {
  it("encodes an empty selection to an empty string", () => {
    expect(encodeUrlPath(EMPTY_SELECTION)).toBe("");
    expect(encodeUrlPath({ file: "Button", showcase: null })).toBe("");
    expect(encodeUrlPath({ file: null, showcase: "Primary" })).toBe("");
  });

  it("encodes a full selection", () => {
    expect(encodeUrlPath({ file: "Button", showcase: "Primary" })).toBe(
      "file=Button&showcase=Primary",
    );
  });

  it("percent-encodes names with special characters (round-trip safe)", () => {
    const selection = { file: "My File", showcase: "Variant / One" };
    const encoded = encodeUrlPath(selection);
    expect(encoded).toBe("file=My%20File&showcase=Variant%20%2F%20One");
    // Round-trip by parsing back as URLSearchParams.
    const decoded = decodeUrlPath({
      file: new URLSearchParams(encoded).get("file") ?? undefined,
      showcase: new URLSearchParams(encoded).get("showcase") ?? undefined,
    });
    expect(decoded).toEqual(selection);
  });
});

describe("applyUrlPath", () => {
  const reg = makeRegistry();

  it("applies a valid file + showcase and expands that group", () => {
    const state = createShowcaseState();
    const next = applyUrlPath(state, reg, {
      file: "Button",
      showcase: "Primary",
    });
    expect(next.selection).toEqual({ file: "Button", showcase: "Primary" });
    expect(next.expanded).toBe("Button");
  });

  it("falls back to no selection when the file is unknown", () => {
    const next = applyUrlPath(createShowcaseState(), reg, {
      file: "Nope",
      showcase: "Primary",
    });
    expect(next.selection).toEqual(EMPTY_SELECTION);
  });

  it("falls back to no selection when the showcase is unknown", () => {
    const next = applyUrlPath(createShowcaseState(), reg, {
      file: "Button",
      showcase: "Missing",
    });
    expect(next.selection).toEqual(EMPTY_SELECTION);
  });

  it("falls back to no selection when a param is missing", () => {
    const next = applyUrlPath(createShowcaseState(), reg, { file: "Button" });
    expect(next.selection).toEqual(EMPTY_SELECTION);
  });

  it("keeps the prior expanded group when the URL path is empty", () => {
    const state: ShowcaseState = {
      selection: { file: "Button", showcase: "Primary" },
      expanded: "Spinner",
    };
    const next = applyUrlPath(state, reg, {});
    expect(next.selection).toEqual(EMPTY_SELECTION);
    expect(next.expanded).toBe("Spinner");
  });
});

describe("env parity: encode -> URLSearchParams -> applyUrlPath round-trip", () => {
  it("round-trips a selection through a real URL", () => {
    const reg = makeRegistry();
    const selection = { file: "Button", showcase: "Secondary" };
    const qs = encodeUrlPath(selection);
    const params = new URLSearchParams(qs);
    const applied = applyUrlPath(createShowcaseState(), reg, {
      file: params.get("file") ?? undefined,
      showcase: params.get("showcase") ?? undefined,
    });
    expect(applied.selection).toEqual(selection);
    expect(applied.expanded).toBe("Button");
  });

  it("round-trips an empty selection to nothing", () => {
    const reg = makeRegistry();
    const applied = applyUrlPath(createShowcaseState(), reg, {
      file: new URLSearchParams("").get("file") ?? undefined,
      showcase: new URLSearchParams("").get("showcase") ?? undefined,
    });
    expect(applied.selection).toEqual(EMPTY_SELECTION);
  });

  it("exposes ShowcaseComponent as the variant type used by the registry", () => {
    // Type-only runtime check that variants are assignable to the opaque type.
    const reg = makeRegistry();
    const variant = reg.variant("Button", "Primary") as ComponentType<unknown>;
    expect(typeof variant).toBe("function");
  });
});
