import { getCountryByCode } from '../utils/getCountryBuCode';

describe('getCountryByCode', () => {
  it('should return the country name for a valid country code', () => {
    const countryCode = 'AU';
    const countryName = getCountryByCode(countryCode);
    expect(countryName).toBe('Австралия');
  });

  it('should return the input code for an unknown country code', () => {
    const unknownCode = 'ZZ';
    const result = getCountryByCode(unknownCode);
    expect(result).toBe(unknownCode);
  });
});
