/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import parentPageStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { BottomSidebar, RightSidebar } from '@src/components/abstract/MediaQuery';
import RoomPrice from '@src/components/concrete/Product/RoomPrice';
import GenericCard from '@src/components/concrete/GenericCard';
import Report from '@src/components/concrete/Product/Report';
import Share from '@src/components/concrete/Product/Share';
import InfoPhrase from '@src/components/concrete/Product/InfoPhrase';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { Flag } from '@src/components/concrete/Icons/svgs';
import Modal from '@src/components/concrete/Modal';

// Types
import { Currency } from '@src/typings/types';

type Props = {
  buttonLabel: string;
  // children: JSX.Element[];
  currency: Currency;
  header: React.ReactElement<any>;
  price?: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  rating?: number;
  reviews?: number;
  sidebar: React.ReactElement<any>;
};

type State = {
  menuOpen: boolean;
  reportingOpen: boolean;
  sharingOpen: boolean;
  sticky: boolean;
  touringOpen: boolean;
};

class PageTemplate extends React.Component<Props, State> {
  public sidebar: React.ReactElement<any>;
  public header: React.ReactElement<any>;
  // public children: Array<React.ReactElement<any>>;

  constructor(props: Props) {
    super(props);
    this.state = {
      menuOpen: false,
      reportingOpen: false,
      sharingOpen: false,
      sticky: false,
      touringOpen: false,
    };

    this.sidebar = props.sidebar; // props.children.find(el => el.key === 'sidebar');
    // this.header = props.header; //  props.children.find(el => el.key === 'header');
    this.header = props.header && React.cloneElement(props.header, {
      openSharing: this.openSharing,
      openTouring: this.openTouring,
    }) || null;
    // this.children = props.children.filter(el => !el.key);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fixSidebar);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixSidebar);
  }

  fixSidebar = (): void => {
    const width = window.innerWidth;
    if (width > 1127) {
      if (window.scrollY > 673) {
        // TODO: hard coded, probably needs to be found based on proper page height/scroll
        this.setState({ sticky: true });
      } else {
        this.setState({ sticky: false });
      }
    } else {
      this.setState({ sticky: false });
    }
  }

  toggleReporting = (): void => {
    this.setState(prevState => {
      document.querySelector('body').style.overflow = prevState.reportingOpen ? 'auto' : 'hidden';
      return { reportingOpen: !this.state.reportingOpen };
    });
  }

  toggleSharing = (): void => {
    this.setState(prevState => {
      document.querySelector('body').style.overflow = prevState.sharingOpen ? 'auto' : 'hidden';
      return { sharingOpen: !this.state.sharingOpen };
    });
  }

  toggleSidebar = (): void => {
    this.setState({
      ...this.state,
      menuOpen: !this.state.menuOpen,
    });
  }

  openReporting = (): void => {
    this.toggleReporting();
  }

  openSharing = (): void => {
    this.toggleSharing();
  }

  openTouring = (): void => {
    this.setState(prevState => {
      document.querySelector('body').style.overflow = prevState.touringOpen ? 'auto' : 'hidden';
      return { touringOpen: !this.state.touringOpen };
    });
  }

  renderModalSidebar = () => {
    const { menuOpen } = this.state;
    return (
      <React.Fragment>
        {menuOpen &&
          <Modal action={this.toggleSidebar}>
            <section>
              {this.sidebar}
            </section>
          </Modal>
        }
      </React.Fragment>
    );
  }

  renderBottomMenu = (touring: boolean) => {
    const { buttonLabel, currency, price, rating, reviews } = this.props;
    return (
      <div className={css(parentPageStyles.mobileTabletMenu, touring ? parentPageStyles.bottomMenu : null)}>
        <div className={css(parentPageStyles.mobileTabletMenuWrap, padding.topbottom_2)}>
          <div className={css(pagestyles.pageContainer, pagestyles.pageContainerAutoWidth, pagestyles.pageContainerChangeableWidthSmall, touring ? [parentPageStyles.bottomMenuWrapper, pagestyles.clearfix, padding.leftright_1_5, padding.leftright_3_small] : padding.leftright_3)}>
            <div className={css(parentPageStyles.mobileMenuTable, touring ? parentPageStyles.bottomMenuTable : null)}>
              <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                <RoomPrice
                  currency={currency.currency_symbol_left}
                  price={price}
                  rating={rating}
                  reviews={reviews}
                />
              </div>
              <div className={css(pagestyles.tableCellMiddle)}>
                <Translatable content={{ transKey: buttonLabel }}>
                  <StyledButton
                    action={this.toggleSidebar}
                    buttonColor="primary"
                  />
                </Translatable>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { children } = this.props;
    const { reportingOpen, sharingOpen, sticky, touringOpen } = this.state;
    return (
      <React.Fragment>
        <main
          className={css(parentPageStyles.pageContainer)}
          id="site-content"
          tabIndex={-1}
        >
          <div>
            <section>
              <div
                id="room"
                itemProp="Product"
                itemScope={true}
                itemType="http://schema.org/Product"
              >
                <div />
                {this.header &&
                  <div>
                    <div>
                      {this.header}
                    </div>
                  </div>
                }
                <div className={css(pagestyles.pageContainer, pagestyles.pageContainerAutoWidth, pagestyles.pageContainerChangeableWidthSmall, pagestyles.pageContainerChangeableWidthLarge, pagestyles.pageContainerWithSelectors, padding.leftright_3, touringOpen && pagestyles.none)}>
                  <div className={css(margin.all_0)}>
                    <div className={css(parentPageStyles.detailsTop)} />
                    <div className={css(pagestyles.row, pagestyles.clearfix)}>
                      <div className={css(pagestyles.column, pagestyles.sevenTwelfthsColumnLargeScreen, padding.leftright_1)}>
                        {children}
                      </div>
                      <RightSidebar>
                        {matches => {
                          if (matches) {
                            return (
                              <div className={css(pagestyles.column, pagestyles.fiveTwelfthsColumn, pagestyles.columnFloat, padding.leftright_1)}>
                                <div>
                                  <div>
                                    <div className={css(margin.top_4, margin.bottom_3)}>
                                      <div className={css(parentPageStyles.sidebarContainer, sticky ? parentPageStyles.sticky : null)}>
                                        <GenericCard
                                          borderColor="#e4e4e4"
                                          borderRadius="none"
                                          boxShadow="none"
                                        >
                                          {this.sidebar}
                                        </GenericCard>
                                        <InfoPhrase>
                                          <Button
                                            action={this.openReporting}
                                            stylesArray={[parentPageStyles.reportButton]}
                                          >
                                            <div className={css(pagestyles.table)}>
                                              <div className={css(pagestyles.tableCellMiddle)}>
                                                <div className={css(margin.right_1)}>
                                                  <Flag />
                                                </div>
                                              </div>
                                              <Translatable content={{ transKey: 'room.report_this_listing' }}>
                                                <div className={css(pagestyles.tableCellMiddle)} />
                                              </Translatable>
                                            </div>
                                          </Button>
                                        </InfoPhrase>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      </RightSidebar>
                    </div>
                  </div>
                </div>
                {!touringOpen &&
                  <BottomSidebar>
                    {matches => {
                      if (matches) {
                        return (
                          <React.Fragment>
                            {this.renderBottomMenu(touringOpen)}
                          </React.Fragment>
                        );
                      }
                      return null;
                    }}
                  </BottomSidebar>
                }
              </div>
            </section>
          </div>
        </main>
        {!touringOpen ? (
          <BottomSidebar>
            {matches => {
              if (matches) {
                return (
                  <React.Fragment>
                    {this.renderModalSidebar()}
                  </React.Fragment>
                );
              }
              return null;
            }}
          </BottomSidebar>
        ) : (
          <React.Fragment>
            {this.renderBottomMenu(touringOpen)}
            {this.renderModalSidebar()}
          </React.Fragment>
        )}
        {sharingOpen &&
          <Modal action={this.toggleSharing}>
            <Share />
          </Modal>
        }
        {reportingOpen &&
          <Modal
            action={this.toggleReporting}
            hasMobile={false}
            large={true}
          >
            <Report />
          </Modal>
        }
      </React.Fragment>
    );
  }
}

export default PageTemplate;
