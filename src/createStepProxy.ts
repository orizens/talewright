import { test } from "@playwright/test"; 
import type { Page } from "@playwright/test";
import { I } from "./I.js";

export type BDD_PREFIX = 'Given' | 'When' | 'Then' | 'And' | 'But';

export function createStepProxy(target: I, prefix: BDD_PREFIX): { I: I } {
  return new Proxy(
    { I: target },
    {
      get(obj: { I: I }, prop: string | symbol) {
        const value = obj[prop as keyof typeof obj];
        if (typeof value === "object" && value !== null) {
          return new Proxy(value as unknown as Record<string | symbol, unknown>, {
            get(innerTarget: Record<string | symbol, unknown>, innerProp: string | symbol) {
              const innerValue = innerTarget[innerProp];
              if (typeof innerValue === "function") {
                return async function (...args: unknown[]) {
                  return test.step(
                    `${prefix} I ${String(innerProp)} "${args.join(", ")}"`,
                    async () => {
                      return (innerValue as (...a: unknown[]) => unknown).apply(innerTarget, args);
                    }
                  );
                };
              }
              return innerValue;
            },
          });
        }
        return value;
      },
    }
  ) as { I: I };
}

export function createNewI(page: Page) {
  return new I(page);
}

export function configureFixture(page: Page, prefix: BDD_PREFIX) {
  return createStepProxy(createNewI(page), prefix);
}