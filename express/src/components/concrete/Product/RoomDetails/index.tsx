/* tslint:disable:max-line-length */
import * as React from 'react';
import Collapse from 'react-collapse';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericHeader from '@src/components/concrete/GenericHeader';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { Chevron } from '@src/components/concrete/Icons/svgs';
import InteractionLink from '@src/components/concrete/InteractionLink';
import Configurations from '@src/components/concrete/Product/Configurations';

// Types
import { Store } from '@src/typings/types';

export type RoomDetailsProps = {
  configurations?: Store.RoomConfig;
  info: Store.RoomInfo;
};

type State = {
  isCollapsed: boolean;
};

class RoomDetails extends React.PureComponent<RoomDetailsProps, State> {
  state: State = { isCollapsed: false };

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  }

  render() {
    const { configurations, info } = this.props;
    const { isCollapsed } = this.state;
    return (
      <section id="details">
        <Translatable attributes={{ text: { transKey: 'room.about_asset_name', count: 1, replacements: { name: info.venue_name } } }}>
          <GenericHeader tag="h5" />
        </Translatable>
        {(configurations && configurations.length > 0) &&
          <Configurations
            configurations={configurations}
            stylesArray={[margin.bottom_3]}
          />
        }
        <div className={css(pagestyles.relativePosition, margin.bottom_2)}>
          <Collapse isOpened={true}>
            <div className={css(styles.textContainer, isCollapsed && styles.collapse)}>
              <p className={css(styles.detailsText)}>
                {info.description}
              </p>
            </div>
          </Collapse>
          <div className={css(margin.topbottom_3)}>
            <InteractionLink
              action={this.handleClick}
              className={css(styles.collapsable, pagestyles.link)}
            >
              <Translatable content={{ transKey: 'room.read_more_about_space' }} />
              <Chevron stylesArray={[styles.chevron, margin.left_0_5, isCollapsed && styles.chevron_collapse]} />
            </InteractionLink>
          </div>
        </div>
        <div className={css(margin.bottom_3)}>
          <Translatable content={{ transKey: 'room.contact_host' }}>
            <StyledButton
              customStyle={[styles.contactButton, padding.topbottom_1, padding.leftright_2]}
              customSpanStyle={[styles.contactButtonSpan]}
            />
          </Translatable>
        </div>
        <div className={css(styles.responsive)}>
          <div className={css(margin.bottom_1)}>
            <span>
              <Translatable content={{ transKey: 'room.response_rate' }} />
              <span className={css(pagestyles.fontMedium, margin.left_0_5)}>
                99%
              </span>
            </span>
          </div>
          <span>
            <Translatable content={{ transKey: 'room.response_time' }} />
            <Translatable content={{ transKey: info.response_time }}>
              <span className={css(pagestyles.fontMedium, margin.left_0_5)} />
            </Translatable>
          </span>
        </div>
        <ContentSeparator marginNum={3} />
        <div className={css(styles.detailsText, margin.bottom_3)}>
          <Translatable content={{ transKey: 'room.communicate_warning' }}>
            <span className={css(pagestyles.fontMedium)} />
          </Translatable>
          {' · '}
          <Translatable content={{ transKey: 'room.communicate_warning_desc' }} />
        </div>
        <ContentSeparator marginNum={4} />
      </section>
    );
  }
}

export default RoomDetails;
