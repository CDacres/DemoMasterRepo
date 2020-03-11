import * as React from 'react';
import Collapse from 'react-collapse';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import GenericHeader from '@src/components/concrete/GenericHeader';
import InteractionLink from '@src/components/concrete/InteractionLink';

type Props = {
  index: number;
  length: number;
  sectionBody: string;
  sectionTitle: string;
};

type State = {
  isCollapsed: boolean;
};

class Toggle extends React.PureComponent<Props, State> {
  state: State = { isCollapsed: false };

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  }

  render() {
    const { index, length, sectionBody, sectionTitle } = this.props;
    const { isCollapsed } = this.state;
    return (
      <React.Fragment>
        <GenericHeader
          stylesArray={[styles.title]}
          tag="h4"
        >
          <InteractionLink
            action={this.handleClick}
            className={css(styles.collapsable)}
          >
            <Translatable content={{ transKey: sectionTitle }} />
          </InteractionLink>
        </GenericHeader>
        <Collapse isOpened={isCollapsed}>
          <Translatable content={{ transKey: sectionBody }}>
            <div className={css(isCollapsed ? styles.collapseBox : pagestyles.none)} />
          </Translatable>
        </Collapse>
        {index !== length - 1 &&
          <ContentSeparator />
        }
      </React.Fragment>
    );
  }
}

export default Toggle;
