export const localiseString = (
  localisedString: string | { values: Array<{ locale: string; value: string }> },
  locale = 'en-US',
): string => {
  if (typeof localisedString === 'string') {
    return localisedString;
  }

  return localisedString.values.find((item) => item.locale === locale)?.value ?? '';
};
