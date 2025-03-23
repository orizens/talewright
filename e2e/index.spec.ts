import { test as base } from "@playwright/test";
import { playwrightBizFixtures } from "../src/index.js";
import type { PlaywrightBizFixtures } from "../src/index.js";

const test = base.extend<PlaywrightBizFixtures>({
    ...playwrightBizFixtures(),
});

test("simple test to verify PlaywrightBiz", async ({ page, When, Given, Then, I }) => {
    await Given.I.openUrl("https://github.com");
    await Then.I.seeText("Build and ship");
    await When.I.clickLink("Try Github Copilot");
    await Then.I.seeText("The AI editor for everyone");
    await When.I.clickLink("Sign in");
    await Then.I.seeText("Sign in to GitHub");
    await Then.I.seeText('New to GitHub?');
    await I.seeText('New to GitHub?');
});