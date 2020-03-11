export const convertLocationStringToSlug = (locationString: string): string =>
  locationString
    .replace(/-/g, '~')
    .replace(/[, ]/g, '-')
    .replace(/[/()]/g, '');

export const convertLocationSlugToString = (locationSlug: string): string =>
  locationSlug
    .replace(/--/g, ', ')
    .replace(/-/g, ' ')
    .replace(/~/g, '-');
