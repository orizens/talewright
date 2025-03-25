import type { Page } from 'playwright-core';
import { expect } from 'playwright/test';

type CommandOptions = {
  position?: number;
  timeout: number;
}
export class I {
  #page: Page;

  constructor(page: Page) {
    this.#page = page;
  }

  async openUrl(url: string) {
    await this.#page.goto(url);
  }

  async clickButton(text: string, options?: CommandOptions) {
    await this.#page.getByRole('button', { name: text }).nth(options?.position ?? 0).click();
  }

  async clickLink(text: string, options?: CommandOptions) {
    await this.#page.getByRole('link', { name: text }).nth(options?.position ?? 0).click();
  }
  
  async clickLabel(text: string, options?: CommandOptions) {
    await this.#page.getByLabel(text).nth(options?.position ?? 0).click();
  }

  async seeText(text: string, options?: CommandOptions) {
    await expect(this.#page.getByText(text).nth(options?.position ?? 0)).toBeVisible();
  }
  
  async seeButton(name:string, options?: CommandOptions) {
    await expect(this.#page.getByRole('button', { name }).nth(options?.position ?? 0)).toBeVisible();
  }
  
  async seeHeading(name:string, options?: CommandOptions) {
    await expect(this.#page.getByRole('heading', { name }).nth(options?.position ?? 0)).toBeVisible();
  }
  
  async seePlaceholder(name:string, options?: CommandOptions) {
    await expect(this.#page.getByPlaceholder(name).nth(options?.position ?? 0)).toBeVisible();
  }

  async clickTab (name: string) {
    await this.#page.getByRole('tab', { name }).click();
  }

  async fillField(label: string, value: string, options?: CommandOptions) {
    await this.#page.getByRole('textbox', { name: label }).nth(options?.position ?? 0).fill(value);
  }

  async selectOption(label: string, value: string, options?: CommandOptions) {
    await this.#page.getByRole('combobox', { name: label }).nth(options?.position ?? 0).selectOption(value);
  }

  async checkCheckbox(label: string, options?: CommandOptions) {
    await this.#page.getByRole('checkbox', { name: label }).nth(options?.position ?? 0).check();
  }

  async uncheckCheckbox(label: string, options?: CommandOptions) {
    await this.#page.getByRole('checkbox', { name: label }).nth(options?.position ?? 0).uncheck();
  }

  async dontSeeText(text: string, options?: CommandOptions) {
    await expect(this.#page.getByText(text).nth(options?.position ?? 0)).not.toBeVisible();
  }

  async waitForElement(selector: string, options?: CommandOptions) {
    await this.#page.waitForSelector(selector, { timeout: options?.timeout ?? 5000 });
  }

  async seeInField(label: string, value: string, options?: CommandOptions) {
    await expect(this.#page.getByRole('textbox', { name: label }).nth(options?.position ?? 0)).toHaveValue(value);
  }
}
