import { country } from '../constants/country';

describe('country', () => {
  it('contains expected country codes', () => {
    // Проверяем, что объект `country` содержит ожидаемые страны и их коды
    expect(country).toEqual({
      'Выберите вашу страну': '',
      Австралия: 'AU',
      Бруней: 'BN',
      Германия: 'DE',
      Украина: 'UA',
      Япония: 'JP',
    });
  });

  it('has a default value for "Выберите вашу страну"', () => {
    // Проверяем, что у "Выберите вашу страну" значение по умолчанию пусто
    expect(country['Выберите вашу страну']).toEqual('');
  });

  it('contains specific country codes', () => {
    // Проверяем, что объект `country` содержит конкретные коды для определенных стран
    expect(country['Австралия']).toEqual('AU');
    expect(country['Бруней']).toEqual('BN');
    expect(country['Германия']).toEqual('DE');
    expect(country['Украина']).toEqual('UA');
    expect(country['Япония']).toEqual('JP');
  });
});
