import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Connectors
import { useLang } from '@src/store/connectors';

// Helpers
import { TranslationHelper } from '@src/helpers';

// Styles
import styles from './styles';

// Types
import { Store } from '@src/typings/types';

type Props = {
  count?: number;
  lang: Store.Lang;
  replacements?: {
    [propName: number]: string | number;
    [propName: string]: string | number;
  };
  variant?: 'field' | 'tip' | 'inherit' | 'card';
  word: string;
};

class Spell extends React.PureComponent<Props> {

  protected translationHelper;

  constructor(props: Props) {
    super(props);
    const { lang } = props;
    this.translationHelper = new TranslationHelper({ messages: lang });
  }

  render() {
    const { count, replacements, variant, word } = this.props;
    let text;
    if (typeof count !== 'undefined') {
      text = this.translationHelper.choice(word, count, replacements);
    } else {
      text = this.translationHelper.get(word);
    }
    switch (variant) {
      case 'tip':
        return (
          <span className={css(styles.container)}>
            <span className={css(styles.tip)}>
              {this.translationHelper.get('common.tip')}
            </span>
            {text}
          </span>
        );
      case 'field':
        return (
          <span className={css(styles.fieldText)}>
            {text}
          </span>
        );
      case 'inherit':
        return (
          <span className={css(styles.text)}>
            {text}
          </span>
        );
      case 'card':
        return (
          <span className={css(styles.cardText)}>
            {text}
          </span>
        );
      default:
        return text || null;
    }
  }
}

export default useLang(Spell);
