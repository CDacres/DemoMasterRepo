export const getMatches = (array: string[], value: string): string[] => {
  const what = value.toLowerCase();
  const matches = array.filter(item => item.toLowerCase().includes(what));
  return matches;
};

export const highlightPortion = (haystack: string, needle: string): string => {
  const index = haystack.indexOf(needle);
  if (needle && needle !== '') {
    return `<p>${haystack.substring(0, index)}<b style="color: #00c6ff;">${haystack.substring(index, index + needle.length)}</b>${haystack.substring(index + needle.length)}</p>`;
  }
};

export const escapeRegexCharacters = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
