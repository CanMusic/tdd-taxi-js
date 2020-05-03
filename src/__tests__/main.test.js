import main from '../index';

test('test main', () => {
  expect(main()).toBe('收费6元\n收费7元\n收费13元\n收费7元\n');
});
