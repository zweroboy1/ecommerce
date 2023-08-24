import { DATE_MINUS_13_YEARS } from '../utils/datetime';

test('checks if DATE_MINUS_13_YEARS is correct', () => {
  const currentYear = new Date().getFullYear();
  const expectedYear = currentYear - 13;

  expect(DATE_MINUS_13_YEARS.getFullYear()).toBe(expectedYear);
});
