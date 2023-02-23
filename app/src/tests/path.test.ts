import { flushPromises, mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";

import App from "@/App.vue";
import { createTestingPinia } from "@pinia/testing";
import router from "@/router/index";

describe("User path", async () => {
  // Defining basic App entry.
  router.push("/");
  await router.isReady();

  // Mount the app as it would be in a browser, with the router and the store
  const appWrapper = mount(App, {
    global: {
      plugins: [router, createTestingPinia({ stubActions: false })],
    },
  });

  test("From HomeView to ResultsView without complete evaluation", async () => {
    // Finding Router button
    router.push("/results");
    await router.isReady();
    await flushPromises();

    // Should be on the Evaluation page
    expect(appWrapper.vm.$route.name).toBe("Evaluation");

    // Going back to the home page
    router.push("/");
    await router.isReady();
    await flushPromises();
  });

  test("From HomeView to ExplanationView", async () => {
    // Expecting to start on the Home page
    expect(appWrapper.vm.$route.name).toBe("Home");

    // Finding Router button
    const navigationButton = appWrapper.find("[data-test=navToExplanation]");

    // Trigger the button to navigate on the other page
    await navigationButton.trigger("click");
    await flushPromises();

    // Should be on the Explanation page
    expect(appWrapper.vm.$route.name).toBe("Explanation");
  });

  test("From ExplanationView to ResultsView", async () => {
    // Expecting to start on the Explanation page
    expect(appWrapper.vm.$route.name).toBe("Explanation");

    // Finding Router button
    const navigationButton = appWrapper.find("[data-test=navToEvaluation]");

    // Trigger the button to navigate on the other page
    await navigationButton.trigger("click");
    await flushPromises();

    // Should be on the Evaluation page
    expect(appWrapper.vm.$route.name).toBe("Evaluation");
  });

  test("Test Result button in EvaluationView with incomplete Evaluation", async () => {
    // Expecting to start on the Evaluation page
    expect(appWrapper.vm.$route.name).toBe("Evaluation");

    // Finding Router button
    const navigationButton = appWrapper.find("[data-test=navToResults]");

    // Trigger the button to navigate on the other page
    await navigationButton.trigger("click");
    await flushPromises();

    // Should stay on the Evaluation page
    expect(appWrapper.vm.$route.name).not.toBe("Results");
  });

  test("Compliant to all item in EvaluationView", async () => {
    // Getting all the menu items to display items
    const subMenus = appWrapper.findAll("[data-test=subcategories]");
    for (let i = 0; i < subMenus.length; i++) {
      // Displaying all the related items
      subMenus[i].trigger("click");
      await flushPromises();

      const items = appWrapper.findAll("[data-test=checkboxes]");

      // Getting all the related items to click on them
      for (let i = 0; i < items.length; i++) {
        items[i].trigger("click");
      }
    }

    // Finding Router button
    const navigationButton = appWrapper.find("[data-test=navToResults]");

    // Trigger the button to navigate on the other page
    await navigationButton.trigger("click");
    await flushPromises();

    // Should be on the Results page
    expect(appWrapper.vm.$route.name).toBe("Results");
  });

  test("ResultsView one hundred percent", async () => {
    // Expecting to start on the Results page
    expect(appWrapper.vm.$route.name).toBe("Results");

    // Test if non-compliant items are not displayed
    const uncheckedSection = appWrapper.find("[data-test=uncheckedSection]");
    expect(uncheckedSection).not;

    // Testing the score value
    const overallScore = appWrapper.find("[data-test=overallScore]");
    expect(overallScore.text()).toBe("100%");
  });

  test("ResultsView with one non-compliant item", async () => {
    // Finding Router button
    const navigationButtonResults = appWrapper.find(
      "[data-test=navToEvaluation]"
    );

    // Trigger the button to navigate on the other page
    await navigationButtonResults.trigger("click");
    await flushPromises();

    // Should be on the Evaluation page
    expect(appWrapper.vm.$route.name).toBe("Evaluation");

    // Finding a checkbox and changing its value
    appWrapper.find("[data-test=checkboxes]").trigger("click");

    // Finding Router button
    const navigationButton = appWrapper.find("[data-test=navToResults]");

    // Trigger the button to navigate on the other page
    await navigationButton.trigger("click");
    await flushPromises();

    // Test if non-compliant items are displayed
    const uncheckedItems = appWrapper.findAll("[data-test=uncheckedItem]");
    expect(uncheckedItems.length).toBe(1);

    // Testing the score value
    const overallScore = appWrapper.find("[data-test=overallScore]");
    const stringScore = overallScore.text().toString();
    const rawScore = stringScore.split("%");
    const score = parseInt(rawScore[0]);
    expect(score).toBeLessThan(100);
  });

  test("ResultsView with one non-related item", async () => {
    // Finding Router button
    const navigationButtonResults = appWrapper.find(
      "[data-test=navToEvaluation]"
    );

    // Trigger the button to navigate on the other page
    await navigationButtonResults.trigger("click");
    await flushPromises();

    // Should be on the Evaluation page
    expect(appWrapper.vm.$route.name).toBe("Evaluation");

    // Finding a checkbox and changing its value
    appWrapper.find("[data-test=checkboxes]").trigger("click");

    // Finding Router button
    const navigationButton = appWrapper.find("[data-test=navToResults]");

    // Trigger the button to navigate on the other page
    await navigationButton.trigger("click");
    await flushPromises();

    // Test if non-compliant items are not displayed
    const uncheckedSection = appWrapper.find("[data-test=uncheckedSection]");
    expect(uncheckedSection).not;

    // Testing the score value
    const overallScore = appWrapper.find("[data-test=overallScore]");
    expect(overallScore.text()).toBe("100%");
  });
});
