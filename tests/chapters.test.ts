import { describe, expect, it } from "vitest";
import { chapters, getChapterAtProgress } from "../lib/experience/chapters";

describe("chapter registry", () => {
  it("covers the full normalized experience without range gaps", () => {
    expect(chapters[0].range[0]).toBe(0);
    expect(chapters.at(-1)?.range[1]).toBe(1);
    for (let index = 1; index < chapters.length; index += 1) {
      expect(chapters[index].range[0]).toBe(chapters[index - 1].range[1]);
    }
  });

  it("clamps progress and resolves boundary chapters", () => {
    expect(getChapterAtProgress(-1).id).toBe("hero");
    expect(getChapterAtProgress(0.2).id).toBe("about");
    expect(getChapterAtProgress(0.32).id).toBe("experience");
    expect(getChapterAtProgress(0.33).id).toBe("experience");
    expect(getChapterAtProgress(2).id).toBe("contact");
  });
});
