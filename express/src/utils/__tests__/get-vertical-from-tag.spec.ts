
import getVerticalFromTag from '../get-vertical-from-tag';

const defaults = {
  meeting: {
    id: 1,
    tagId: 1,
    title: 'meeting',
  },
};

const tags = [
  {
    id: 1171,
    tagId: 152,
    languageCode: 'en',
    label: 'focus group',
    homeLabel: null,
    homeLabelOrder: null,
    quickSlug: 'focus-group-rooms',
    quickVerticalId: 1,
    preferred: 0,
    defaultOrder: null,
    name: 'meeting rooms',
  },
];

describe('getVerticalFromTag', () => {
  it('should get the correct vertical from a given tag', () => {
    expect(getVerticalFromTag(defaults, tags, 'focus-group-rooms')).toEqual({
      tagObj: tags[0],
      vertical: defaults.meeting,
    });
  });

  it('should get the default vertical if no tag is found', () => {
    expect(getVerticalFromTag(defaults, tags, 'training-rooms')).toEqual(undefined);
  });
});
