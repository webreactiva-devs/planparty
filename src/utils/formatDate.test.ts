import { dateFormatter, dateIsoFormatter } from "./formatDate";

describe("dateIsoFormatter", () => {
  test('should correctly format date in "fr-CA" locale', () => {
    const date = new Date(2023, 11, 31); // December 31, 2023
    const formattedDate = dateIsoFormatter.format(date);
    expect(formattedDate).toBe("2023-12-31");
  });

  test("should correctly format date wtesth single digtest month and day", () => {
    const date = new Date(2023, 0, 1); // January 1, 2023
    const formattedDate = dateIsoFormatter.format(date);
    expect(formattedDate).toBe("2023-01-01");
  });
});

describe("dateFormatter", () => {
  test("should format a date in default format", () => {
    const date = new Date("2022-01-01T00:00:00.000Z");
    expect(dateFormatter.format(date)).toBe("01/01/2022");
  });
});
