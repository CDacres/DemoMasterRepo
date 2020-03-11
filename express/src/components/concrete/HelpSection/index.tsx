import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import ContentSeparator from '@src/components/concrete/ContentSeparator';

declare const window: {
  hubspot: any;
};

class HelpSection extends React.PureComponent {
  initHSChat = () => {
    if (typeof window !== 'undefined') {
      window.hubspot.messages.EXPERIMENTAL_API.requestWidgetOpen();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={css(pagestyles.rightText, padding.topbottom_8)}>
          <ContentSeparator />
          <Translatable content={{ transKey: 'common.still_need_help' }}>
            <div className={css(pagestyles.inlineBlock, margin.right_4, padding.top_8)} />
          </Translatable>
          <div className={css(pagestyles.inlineBlock, padding.top_8)}>
            <Translatable content={{ transKey: 'common.start_a_chat' }}>
              <StyledButton action={this.initHSChat} />
            </Translatable>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HelpSection;
