import Lang from './Lang';

// Types
import { Store } from '@src/typings/types';

type OptionsType = {
  messages: Store.Lang;
};

export default class TranslationHelper extends Lang {
  protected messages: Store.Lang;

  constructor(options: OptionsType) {
    super(options);
    this.messages = options.messages;
  }
}
