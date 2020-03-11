import * as React from 'react';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Constants
import { DINING, MEETING, OFFICE, PARTY, WEDDING } from '@src/constants/verticalTypes';

// Components
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import GenericHeader from '@src/components/concrete/GenericHeader';
import NavButton from '@src/components/concrete/Venue/VenuePopUp/InfoList/NavButton';
import ListItem from '@src/components/concrete/Venue/VenuePopUp/InfoList/ListItem';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Data
import { popup } from '@src/data/venue/popup'; // TODO: hardcoded data

type Props = {
  subtitle: string;
  title: string;
};

type State = {
  all: boolean;
  dining?: boolean;
  meeting?: boolean;
  office?: boolean;
  party?: boolean;
  wedding?: boolean;
};

class InfoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      all: true,
      dining: false,
      meeting: false,
      office: false,
      party: false,
      wedding: false,
    };
  }

  setButtonState = (type) => {
    this.setState({
      all: (type === 'all') ? true : false,
      dining: (type === 'dining') ? true : false,
      meeting: (type === 'meeting') ? true : false,
      office: (type === 'office') ? true : false,
      party: (type === 'party') ? true : false,
      wedding: (type === 'wedding') ? true : false,
    });
  }

  render() {
    const { subtitle, title } = this.props;
    const diningItems = popup.filter(item => item.verticalId === DINING);
    const meetingItems = popup.filter(item => item.verticalId === MEETING);
    const officeItems = popup.filter(item => item.verticalId === OFFICE);
    const partyItems = popup.filter(item => item.verticalId === PARTY);
    const weddingItems = popup.filter(item => item.verticalId === WEDDING);
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.headerWrapper, padding.bottom_1)}>
          <ProductLargeScreen>
            {matches => {
              if (matches) {
                return (
                  <div className={css(styles.headerText, padding.top_6, padding.leftright_1, padding.bottom_0)}>
                    <section>
                      <GenericHeader
                        stylesArray={[pagestyles.defaultTitle]}
                        tag="h1"
                      >
                        <Translatable content={{ transKey: title }}>
                          <div className={css(styles.titleText, margin.all_0, padding.topbottom_0_75)} />
                        </Translatable>
                      </GenericHeader>
                    </section>
                    <div className={css(styles.subtitleWrapper)}>
                      <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                        <Translatable content={{ transKey: subtitle }}>
                          <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
                        </Translatable>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          </ProductLargeScreen>
          <div className={css(styles.navButtons, padding.top_3)}>
            <NavButton
              onClick={() => this.setButtonState('all')}
              text="common.all"
            />
            {diningItems.length > 0 &&
              <NavButton
                onClick={() => this.setButtonState('dining')}
                text="common.dining"
              />
            }
            {meetingItems.length > 0 &&
              <NavButton
                onClick={() => this.setButtonState('meeting')}
                text="common.meeting"
              />
            }
            {officeItems.length > 0 &&
              <NavButton
                onClick={() => this.setButtonState('office')}
                text="common.office"
              />
            }
            {partyItems.length > 0 &&
              <NavButton
                onClick={() => this.setButtonState('party')}
                text="common.party"
              />
            }
            {weddingItems.length > 0 &&
              <NavButton
                onClick={() => this.setButtonState('wedding')}
                text="common.wedding"
              />
            }
          </div>
        </div>
        <div>
          {popup.map(({ header, items, verticalId }) => {
            if (this.state.dining && verticalId === DINING) {
              return (
                <ListItem
                  header={header}
                  items={items}
                  key={shortid.generate()}
                />
              );
            } else if (this.state.meeting && verticalId === MEETING) {
              return (
                <ListItem
                  header={header}
                  items={items}
                  key={shortid.generate()}
                />
              );
            } else if (this.state.office && verticalId === OFFICE) {
              return (
                <ListItem
                  header={header}
                  items={items}
                  key={shortid.generate()}
                />
              );
            } else if (this.state.party && verticalId === PARTY) {
              return (
                <ListItem
                  header={header}
                  items={items}
                  key={shortid.generate()}
                />
              );
            } else if (this.state.wedding && verticalId === WEDDING) {
              return (
                <ListItem
                  header={header}
                  items={items}
                  key={shortid.generate()}
                />
              );
            } else if (this.state.all) {
              return (
                <ListItem
                  header={header}
                  items={items}
                  key={shortid.generate()}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default InfoList;
