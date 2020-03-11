import * as React from 'react';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import MenuCard from '@src/components/concrete/Product/RoomMenu/MenuCard';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import GenericHeader from '@src/components/concrete/GenericHeader';
import GenericCard from '@src/components/concrete/GenericCard';
import AccentUpperText from '@src/components/concrete/Product/AccentUpperText';
import InteractionLink from '@src/components/concrete/InteractionLink';
import Modal from '@src/components/concrete/Modal';
import Thumbnails from '@src/components/concrete/Thumbnails';

// Types
import { Currency, Menu } from '@src/typings/types';

export type RoomMenuProps = {
  currency: Currency;
  inVenuePage?: boolean;
  menu: {
    carteMenu?: Array<{
      title: string;
      menu: Menu;
    }>;
    drinks?: Menu;
    meals?: Menu;
    pictures?: string[];
    setMenu?: Array<{
      menu: string[];
      title: string;
    }>;
  };
};

type State = {
  chosenMenu: {
    menu: string[];
    title: string;
  };
  menuOpen: boolean;
};

class RoomMenu extends React.PureComponent<RoomMenuProps, State> {
  constructor(props: RoomMenuProps) {
    super(props);
    this.state = {
      chosenMenu: null,
      menuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState({
      ...this.state,
      menuOpen: !this.state.menuOpen,
    });
  }

  chooseMenu = (item) => {
    this.toggleMenu();
    this.setState({ chosenMenu: item });
  }

  render() {
    const { menu, menu: { drinks, meals, pictures, setMenu, carteMenu }, currency, inVenuePage } = this.props;
    const { chosenMenu, menuOpen } = this.state;
    return (
      <React.Fragment>
        {menu &&
          <section id="food_drinks">
            {!inVenuePage &&
              <div className={css(margin.bottom_2)}>
                <GenericHeader text="room.carte" />
              </div>
            }
            {(pictures && pictures.length > 0) &&
              <div className={css(margin.bottom_2)}>
                <Thumbnails
                  // action={} // TODO: add action to open the tour this venue + scroll to right picture/section
                  images={pictures}
                />
              </div>
            }
            {(setMenu && setMenu.length > 0) &&
              <div className={css(styles.setMenuWrapper, margin.bottom_2)}>
                {setMenu.map(item => (
                  <GenericCard
                    boxShadow="none"
                    key={shortid.generate()}
                    padding="0px"
                  >
                    <div className={css(styles.overflowWrapper, padding.all_3)}>
                      <div
                        aria-hidden="true"
                        className={css(margin.bottom_3)}
                      >
                        <AccentUpperText
                          color="dark"
                          size="medium"
                          text={item.title}
                          weight="semiBold"
                        />
                      </div>
                      <div className={css(styles.setMenu)}>
                        {item.menu.map(setItem => (
                          <div
                            className={css(margin.bottom_1)}
                            key={shortid.generate()}
                          >
                            {setItem}
                          </div>
                        ))}
                      </div>
                      <InteractionLink
                        action={() => this.chooseMenu(item)}
                        className={css(pagestyles.link)}
                      >
                        <Translatable content={{ transKey: 'common.show_more' }} />
                      </InteractionLink>
                    </div>
                  </GenericCard>
                ))}
              </div>
            }
            {carteMenu && carteMenu.map((x, k) => (
              <div
                className={css(margin.bottom_2)}
                key={k}
              >
                <MenuCard
                  currency={currency.currency_symbol_left}
                  {...x.menu}
                />
              </div>
            ))}
            {drinks &&
              <div className={css(margin.bottom_2)}>
                <MenuCard
                  currency={currency.currency_symbol_left}
                  menu={drinks.menu}
                  notes={drinks.notes}
                  specials={drinks.specials}
                />
              </div>
            }
            {meals &&
              <div>
                <MenuCard
                  currency={currency.currency_symbol_left}
                  menu={meals.menu}
                  notes={meals.notes}
                  specials={meals.specials}
                />
              </div>
            }
            {!inVenuePage &&
              <ContentSeparator marginNum={4} />
            }
            {(menuOpen && chosenMenu && chosenMenu.menu.length > 0) &&
              <Modal action={this.toggleMenu}>
                <React.Fragment>
                  <header>
                    <div>
                      <GenericHeader text={chosenMenu.title} />
                    </div>
                  </header>
                  <section>
                    <ContentSeparator marginNum={3} />
                    {chosenMenu.menu.map(setItem => (
                      <div
                        className={css(margin.bottom_1)}
                        key={shortid.generate()}
                      >
                        {setItem}
                      </div>
                    ))}
                  </section>
                </React.Fragment>
              </Modal>
            }
          </section>
        }
      </React.Fragment>
    );
  }
}

export default RoomMenu;
