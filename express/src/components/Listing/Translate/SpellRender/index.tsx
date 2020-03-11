import * as React from 'react';

// Connectors
import { useLang } from '@src/store/connectors';

// Helpers
import { TranslationHelper } from '@src/helpers';

// Types
import { Store } from '@src/typings/types';

type Props = {
  lang: Store.Lang;
  render: (speller: TranslationHelper) => React.ReactNode;
};

class SpellRender extends React.PureComponent<Props> {

  protected translationHelper;

  constructor(props: Props) {
    super(props);
    const { lang } = props;
    this.translationHelper = new TranslationHelper({ messages: lang });
  }

  render() {
    const { render } = this.props;
    return (
      <React.Fragment>
        {!!render ? (
          <React.Fragment>
            {render(this.translationHelper)}
          </React.Fragment>
        ) : (
          null
        )}
      </React.Fragment>
    );
  }
}

export default useLang(SpellRender);
