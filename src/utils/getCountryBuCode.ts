import { country } from '../constants/country';

const getCountryByCode = (code: string): string =>
  Object.values(country).includes(code)
    ? Object.entries(country).filter(([, value]) => code === value)[0][0]
    : code;

export { getCountryByCode };
