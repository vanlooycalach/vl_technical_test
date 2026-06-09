import { formatList } from './product-format';

describe('formatList', () => {
  it('joins array values', () => {
    expect(formatList(['13 MP', 'autofocus'])).toBe('13 MP, autofocus');
  });

  it('returns string values as-is', () => {
    expect(formatList('5 MP')).toBe('5 MP');
  });

  it('returns empty string for missing values', () => {
    expect(formatList(null)).toBe('');
    expect(formatList(undefined)).toBe('');
  });
});
