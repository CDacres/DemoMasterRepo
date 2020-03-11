import * as React from 'react';
import Collapse from 'react-collapse';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import Card from '@src/components/concrete/Grid/CardsGrid/Card';
import CardContent from '@src/components/concrete/Grid/CardsGrid/Card/CardContent';
import CardText from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardText';
import GenericHeader from '@src/components/concrete/GenericHeader';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import InteractionLink from '@src/components/concrete/InteractionLink';

// Helpers
import { ColorHelper } from '@src/helpers';

// Types
import { RoomCardType } from '@src/typings/types';

type Props = {
  spaces: RoomCardType;
};

type State = {
  isCollapsed: boolean;
  spaceLimit: number;
};

class RoomOtherSpaces extends React.PureComponent<Props, State> {
  colorHelper = new ColorHelper();

  state: State = {
    isCollapsed: false,
    spaceLimit: 4,
  };

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  }

  renderOtherSpaces = () => {
    const { spaces } = this.props;
    const { isCollapsed, spaceLimit } = this.state;
    return spaces.map((card, index) => {
      if (index >= spaceLimit && !isCollapsed) {
        return;
      }
      const color = this.colorHelper.getVerticalColors()[card.verticalId];
      return (
        <Card
          cardCount={2}
          key={shortid.generate()}
          {...card}
        >
          <CardContent
            color={color}
            {...card}
          >
            <CardText
              showText={false}
              {...card}
            />
          </CardContent>
        </Card>
      );
    });
  }

  render() {
    const { spaces } = this.props;
    const { isCollapsed, spaceLimit } = this.state;
    return (
      <React.Fragment>
        {(spaces && spaces.length > 0) &&
          <section id="other_spaces">
            <div className={css(margin.bottom_2)}>
              <GenericHeader text="room.other_space" />
            </div>
            <div>
              <Collapse isOpened={true}>
                <div className={css(pagestyles.row, isCollapsed && styles.collapse)}>
                  {this.renderOtherSpaces()}
                </div>
              </Collapse>
              {spaces.length > spaceLimit &&
                <InteractionLink
                  action={this.handleClick}
                  className={css(styles.collapsable, pagestyles.link, margin.top_6)}
                >
                  <Translatable content={{ transKey: isCollapsed ? 'room.hide_spaces' : 'room.show_more_spaces' }} />
                </InteractionLink>
              }
            </div>
            <ContentSeparator marginNum={4} />
          </section>
        }
      </React.Fragment>
    );
  }
}

export default RoomOtherSpaces;
