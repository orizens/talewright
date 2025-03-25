# Talewright

Talewright is a Given-When-Then syntax testing library for Playwright (inspired by [cucumber.io](https://cucumber.io) and [codeceptjs.io](https://codecept.io)), enabling clear, human-readable end-to-end tests that flow like a story.

## Installation

```sh
npm install talewright
```

## Quick Start

```ts
const test = base.extend<TalewrightFixtures>({
    ...talewrightFixtures(),
});

test("simple test to verify Talewright", async ({ page, When, Given, Then, I }) => {
  await Given.I.openUrl("https://github.com");
  await Then.I.seeText("Build and ship");
  await When.I.clickLink("Try GitHub Copilot");
  await Then.I.seeText("The AI editor for everyone");
  await When.I.clickLink("Sign in");
  await Then.I.seeText("Sign in to GitHub");
  await Then.I.seeText("New to GitHub?");
});
```

## Features
- **Readable syntax**: Write tests like a story using `Given`, `When`, and `Then`
- **Full Playwright support**: Built on top of Playwright’s API
- **Clear assertions**: Use `Then.I.seeText()` and `When.I.clickLink()` for intuitive interactions
- **Creates `test.step()` for each command**: so it is easy to see it in Playwright's Trace Viewer - making the generated report similar to the code you write.

## Trace View 
![./images/traceview.png](./images/traceview.png)

## API

### `Given.I.openUrl(url: string)`
Opens the given URL in a new browser session.

### `Then.I.seeText(text: string, options?: CommandOptions)`
Asserts that the specified text is visible on the page.

### `When.I.clickLink(text: string, options?: CommandOptions)`
Finds a link containing the given text and clicks it.

### `I.seeText(text: string, options?: CommandOptions)`
A shorthand for asserting text presence.

### `I.clickButton(text: string, options?: CommandOptions)`
Finds a button containing the given text and clicks it.

### `I.clickLabel(text: string, options?: CommandOptions)`
Finds a label containing the given text and clicks it.

### `I.seeButton(name: string, options?: CommandOptions)`
Asserts that a button with the given name is visible.

### `I.seeHeading(name: string, options?: CommandOptions)`
Asserts that a heading with the given name is visible.

### `I.seePlaceholder(name: string, options?: CommandOptions)`
Asserts that a placeholder with the given name is visible.

### `I.clickTab(name: string)`
Finds a tab containing the given name and clicks it.

### `I.fillField(label: string, value: string, options?: CommandOptions)`
Finds a text input field with the given label and fills it with the specified value.

### `I.selectOption(label: string, value: string, options?: CommandOptions)`
Finds a dropdown (combobox) with the given label and selects the specified value.

### `I.checkCheckbox(label: string, options?: CommandOptions)`
Finds a checkbox with the given label and checks it.

### `I.uncheckCheckbox(label: string, options?: CommandOptions)`
Finds a checkbox with the given label and unchecks it.

### `I.dontSeeText(text: string, options?: CommandOptions)`
Asserts that the specified text is not visible on the page.

### `I.waitForElement(selector: string, options?: CommandOptions)`
Waits for an element matching the given selector to appear on the page.

### `I.seeInField(label: string, value: string, options?: CommandOptions)`
Asserts that a text input field with the given label contains the specified value.

## Contributing
Feel free to submit issues or pull requests on [GitHub](https://github.com/your-repo/talewright).

## License
MIT

