// Types
import { Tag, Vertical } from '@src/typings/types';

type Defaults = {
  [verticalName: string]: Vertical;
};
type Response = undefined | {
  tagObj: Tag;
  vertical: Tag;
};

export default function getVerticalFromTag(defaults: Defaults, tags: Tag[], tag: string): Response {
  const tagObj = tags.find(t => t.quickSlug === tag);
  if (!tagObj) {
    return undefined;
  }
  const vertical = Object.keys(defaults).map(key => defaults[key]).find(vert => vert.tagId === tagObj.quickVerticalId);
  return {
    tagObj,
    vertical,
  };
}
