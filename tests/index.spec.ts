import { test as base } from "@playwright/test";
import { playwrightBizFixtures } from "../src/index.js";
import type { PlaywrightBizFixtures } from "../src/index.js";

const test = base.extend<PlaywrightBizFixtures>({
    ...playwrightBizFixtures(),
});

test("Add Workflow Parameters", async ({ When, Given, Then }) => {
    await Given.I.openUrl("https://example.com");
    await When.I.clickButton("workflows");
    await Then.I.seeText("Workflows");
    await When.I.clickLink("Add Workflow Parameters");
    await Then.I.seeText("Add Workflow Parameters Loaded");
    await Then.I.seeText('Game Over!');
});