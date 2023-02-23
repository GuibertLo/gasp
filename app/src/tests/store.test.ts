import { setActivePinia, createPinia } from "pinia";
import { useEvaluationStore } from "@/stores/evaluation";
import { initializeData } from "@/modules/dataHandler";
import { expect, describe, beforeEach, test } from "vitest";

describe("Evaluation Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    setActivePinia(createPinia());
  });

  test("Default state", () => {
    const store = useEvaluationStore();
    expect(store.getStatus).toBe(false);
  });

  test("Loaded state", () => {
    initializeData();
    const store = useEvaluationStore();
    expect(store.getStatus).toBe(true);
  });
});
