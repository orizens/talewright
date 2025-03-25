import { test } from "@playwright/test"; 
import type { Page } from "@playwright/test";
import { I } from "./I.js";

export type BDD_PREFIX = 'Given' | 'When' | 'Then' | 'And' | 'But';

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

export function createNewI(page: Page) {
  return new I(page);
}

export function configureFixture(page: Page, prefix: BDD_PREFIX) {
  return createStepProxy(createNewI(page), prefix);
}