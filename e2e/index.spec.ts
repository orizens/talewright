import { test as base } from "@playwright/test";
import { talewrightFixtures } from "../src/index.js";
import type { TalewrightFixtures } from "../src/index.js";

const test = base.extend<TalewrightFixtures>({
    ...talewrightFixtures(),
});

test("simple test to verify Talewright", async ({ page, When, Given, Then, I }) => {
    await Given.I.openUrl("https://github.com");
    await Then.I.seeText("Build and ship");
    await When.I.clickLink("Try Github Copilot");
    await Then.I.seeText('Try Copilot Pro for 30 days');
    await When.I.clickButton("Try Now");
    await Then.I.seeText("Sign in to GitHub");
    await Then.I.seeText('New to GitHub?');
    await I.seeText('New to GitHub?');
});