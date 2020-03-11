/* tslint:disable:max-line-length */
import * as React from 'react';
import Collapse from 'react-collapse';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import InteractionLink from '@src/components/concrete/InteractionLink';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  inVenuePage?: boolean;
  text: string;
};

type State = {
  isCollapsed: boolean;
};

class ReviewText extends React.PureComponent<Props, State> {
  state: State = { isCollapsed: false };

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  }

  render() {
    const { inVenuePage, text } = this.props;
    const { isCollapsed } = this.state;
    return (
      <React.Fragment>
        <Collapse isOpened={true}>
          <div className={css(isCollapsed && styles.collapse, inVenuePage ? [pagestyles.subtitle, margin.all_0] : styles.review)}>
            {text}
          </div>
        </Collapse>
        <InteractionLink
          action={this.handleClick}
          className={css(styles.collapsable, pagestyles.link)}
        >
          <Translatable content={{ transKey: isCollapsed ? 'room.read_less' : 'room.read_more' }} />
        </InteractionLink>
      </React.Fragment>
    );
  }
}

export default ReviewText;
