export const convertTagStringToSlug = tagString =>
  tagString.toLowerCase().replace(/-/g, '~').replace(/[, ]/g, '-').replace(/[/()]/g, '');

export const convertTagSlugToString = tagSlug =>
  tagSlug.toLowerCase().replace(/--/g, ', ').replace(/-/g, ' ').replace(/~/g, '-');
