import { test, expect, type Page }  from '@playwright/test';
type CommandOptions = {
  position?: number;
}
class I {
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
  
  async clickLink(text: string,  options?: CommandOptions) {
    await this.#page.getByRole('link', { name: text }).nth(options?.position ?? 0).click();
  }

  async seeText(text: string, options?: CommandOptions) {
    await expect(this.#page.getByText(text).nth(options?.position ?? 0)).toBeVisible();
  }

  async fillField(text: string, value: string, options?: CommandOptions) {
    await this.#page.getByRole('textbox', { name: text }).nth(options?.position ?? 0).fill(value);
  }
}

type BDD_PREFIX = 'Given' | 'When' | 'Then' | 'And' | 'But';
export function createStepProxy(target: I, prefix: BDD_PREFIX) {
  return new Proxy(
    { I: target },
    {
      get(target: never, prop, receiver) {
        const value = target?.[prop] as never;
        if (typeof value === "object" && value !== null) {
          return new Proxy(value, {
            get(innerTarget, innerProp) {
              const innerValue = innerTarget[innerProp] as never;
              if (typeof innerValue === "function") {
                return async function (...args: never[]) {
                  return test.step(`${prefix} I ${innerProp as never} "${args.join(
                    ", "
                  )}"`, async () => {
                    return (innerValue as Function).apply(innerTarget, args);
                  });
                };
              }
              return innerValue;
            },
          });
        }
        return value;
      },
    }
  );
}

export const prefix = ['Given', 'When', 'Then', 'And', 'But'] as BDD_PREFIX[];
export function configurePlaywrightFixture(page: Page) {
  const api = prefix.reduce((acc, prefix) => {
    acc[prefix] = configureFixture(page, prefix as BDD_PREFIX);
    return acc;
  }, {} as Record<BDD_PREFIX, ReturnType<typeof createStepProxy>>);
  return api;
}

export function configureFixture(page: Page, prefix: BDD_PREFIX) {
  return createStepProxy(createNewI(page), prefix);
}

function createNewI(page: Page) {
  return new I(page);
}
export interface PlaywrightBizFixtures {
  Given: ReturnType<typeof configureFixture>;
  When: ReturnType<typeof configureFixture>;
  Then: ReturnType<typeof configureFixture>;
  And: ReturnType<typeof configureFixture>;
  But: ReturnType<typeof configureFixture>;
  I: ReturnType<typeof createNewI>;
}
export function playwrightBizFixtures () {
  return prefix.reduce((acc, prefix) => ({
    ...acc,
    [prefix]: async ({ page }: { page: Page; }, use: any) => {
      const fixture = configureFixture(page, prefix);
      await use(fixture);
    },
  }), {
    I: async ({ page }: { page: Page; }, use: any) => {
      const fixture = createNewI(page);
      await use(fixture);
    }
  }) as unknown as PlaywrightBizFixtures;
}