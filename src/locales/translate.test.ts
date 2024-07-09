// src/locales/translate.test.ts
import { beforeAll, describe, expect, test, vi } from "vitest";

beforeAll(() => {
  vi.doMock("@/locales/es.json", () => ({
    default: {
      "list.name.required": "El nombre es requerido",
      "list.name.format": "El nombre no debe tener más de 50 caracteres",
      "list.user.required": "El usuario es requerido",
      "list.user.format": "El usuario no debe tener más de 50 caracteres",
      "list.greeting": "Hola, {{name}}! Bienvenido a la lista.",
      "list.complex": "Hola, {{name}}! Tienes {{count}} elementos en tu lista.",
    },
  }));
});

describe("translate function", () => {
  test("returns translation for a key without params", async () => {
    const translate = (await import("@/locales/translate")).default;
    const key = "list.name.required";
    const expectedTranslation = "El nombre es requerido";
    expect(translate(key)).toBe(expectedTranslation);
  });

  test("returns translation for another key without params", async () => {
    const translate = (await import("@/locales/translate")).default;
    const key = "list.name.format";
    const expectedTranslation = "El nombre no debe tener más de 50 caracteres";
    expect(translate(key)).toBe(expectedTranslation);
  });

  test("returns translation for a key with params", async () => {
    const translate = (await import("@/locales/translate")).default;
    const key = "list.greeting";
    const params = { name: "Juan" };
    const expectedTranslation = "Hola, Juan! Bienvenido a la lista.";
    expect(translate(key, params)).toBe(expectedTranslation);
  });

  test("returns key if translation is not found", async () => {
    const translate = (await import("@/locales/translate")).default;
    const key = "nonexistent_key";
    expect(translate(key)).toBe(key);
  });

  test("returns key with params if translation is not found", async () => {
    const translate = (await import("@/locales/translate")).default;
    const key = "nonexistent_key";
    const params = { name: "Juan" };
    const expectedOutput = "nonexistent_key";
    expect(translate(key, params)).toBe(expectedOutput);
  });

  test("replaces multiple params correctly", async () => {
    const translate = (await import("@/locales/translate")).default;
    const key = "list.complex";
    const params = { name: "Juan", count: 5 };
    const expectedTranslation = "Hola, Juan! Tienes 5 elementos en tu lista.";
    expect(translate(key, params)).toBe(expectedTranslation);
  });

  test("ignores params not present in the translation string", async () => {
    const translate = (await import("@/locales/translate")).default;
    const key = "list.greeting";
    const params = { name: "Juan", age: 30 };
    const expectedTranslation = "Hola, Juan! Bienvenido a la lista.";
    expect(translate(key, params)).toBe(expectedTranslation);
  });
});
