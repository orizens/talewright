import { type Page }  from '@playwright/test';
import { configureFixture, createNewI, createStepProxy, type BDD_PREFIX } from './createStepProxy.js';
import { I } from './I.js';

export { I };
export const prefix = ['Given', 'When', 'Then', 'And', 'But'] as BDD_PREFIX[];

/**
 * @deprecated Use `talewrightFixtures()` with `test.extend()` instead.
 * This helper creates BDD proxies from a manually obtained `page` instance
 * and cannot be used directly with Playwright's fixture system.
 */
export function configurePlaywrightFixture(page: Page) {
  const api = prefix.reduce((acc, prefix) => {
    acc[prefix] = configureFixture(page, prefix as BDD_PREFIX);
    return acc;
  }, {} as Record<BDD_PREFIX, ReturnType<typeof createStepProxy>>);
  return api;
}

export interface TalewrightFixtures {
  Given: ReturnType<typeof configureFixture>;
  When: ReturnType<typeof configureFixture>;
  Then: ReturnType<typeof configureFixture>;
  And: ReturnType<typeof configureFixture>;
  But: ReturnType<typeof configureFixture>;
  I: I;
}
export function talewrightFixtures () {
  return prefix.reduce((acc, prefix) => ({
    ...acc,
    [prefix]: async ({ page }: { page: Page; }, use: (fixture: ReturnType<typeof createStepProxy>) => Promise<void>) => {
      const fixture = configureFixture(page, prefix);
      await use(fixture);
    },
  }), {
    I: async ({ page }: { page: Page; }, use: (i: I) => Promise<void>) => {
      const fixture = createNewI(page);
      await use(fixture);
    }
  }) as unknown as TalewrightFixtures;
}