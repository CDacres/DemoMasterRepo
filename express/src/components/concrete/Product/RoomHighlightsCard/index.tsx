/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import GenericCard from '@src/components/concrete/GenericCard';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import AccentUpperText from '@src/components/concrete/Product/AccentUpperText';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { Thumb } from '@src/components/concrete/Icons/svgs';
import Button from '@src/components/concrete/Button';

type State = {
  isHelpful: boolean;
};

class RoomHighlightsCard extends React.PureComponent<{}, State> {
  state: State = { isHelpful: false };

  handleHelpful = (button: boolean): void => {
    if (this.state.isHelpful === button) {
      return;
    }
    this.setState({ isHelpful : button });
  }

  render() {
    const { isHelpful } = this.state;
    return (
      <section id="highlights">
        <GenericCard>
          <AccentUpperText text="room.venue_highlights" />
          <div className={css(margin.top_1_5)}>
            <div className={css(styles.checkin, margin.bottom_1)}>
              <Translatable content={{ transKey: 'room.check_in_experience' }}>
                <span className={css(pagestyles.fontMedium)} />
              </Translatable>
              {' · '}
              <Translatable content={{ transKey: 'room.check_in_rating', count: 1, replacements: { percentages: 95 } }} />
            </div>
            <div className={css(styles.infoControls)}>
              <Button
                action={() => this.handleHelpful(true)}
                stylesArray={[styles.controlsText]}
              >
                <Translatable content={{ transKey: 'room.helpful' }} />
                <span className={css(margin.left_0_5)}>
                  <Thumb isHelpful={isHelpful} />
                </span>
              </Button>
              {' · '}
              <Translatable content={{ transKey: 'room.not_helpful' }}>
                <Button
                  action={() => this.handleHelpful(false)}
                  stylesArray={[styles.controlsText, styles.greyText]}
                />
              </Translatable>
            </div>
          </div>
        </GenericCard>
        <ContentSeparator marginNum={4} />
      </section>
    );
  }
}

export default RoomHighlightsCard;
