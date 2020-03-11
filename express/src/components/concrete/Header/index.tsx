/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Connectors
import { useAuth, useConfig } from '@src/store/connectors';

// Components
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import CheckoutSteps from '@src/components/concrete/Header/CheckoutSteps';
import FlyoutMenu from '@src/components/concrete/Header/FlyoutMenu';
import Logo from '@src/components/concrete/Header/Logo';
import Nav from '@src/components/concrete/Header/Nav';
import SearchBar from '@src/components/concrete/Header/SearchBar';
import NavProvider, { NavContext, ContextValue } from '@src/components/concrete/Header/Nav/NavProvider';

// Types
import { Store } from '@src/typings/types';

type Props = {
  auth: Store.Auth;
  config: Store.Config;
};

type State = {
  currentPage: number;
  flyoutOpen: boolean;
};

class Header extends React.Component<Props, State> {
  state: State = {
    currentPage: 1,
    flyoutOpen: false,
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps.config.header.floating !== this.props.config.header.floating) {
      return true;
    }
    if (nextProps.config.header.smallLogo !== this.props.config.header.smallLogo) {
      return true;
    }
    if (nextProps.config.header.transparent !== this.props.config.header.transparent) {
      return true;
    }
    if (nextProps.config.header.withCheckoutSteps !== this.props.config.header.withCheckoutSteps) {
      return true;
    }
    if (nextProps.config.header.withSearchBar !== this.props.config.header.withSearchBar) {
      return true;
    }
    if (nextState.flyoutOpen !== this.state.flyoutOpen) {
      return true;
    }
    return false;
  }

  handlePageChange = (num: number): void => {
    this.setState({ currentPage: num });
  }

  toggleFlyout = () => {
    this.setState(prevState => {
      document.querySelector('body').style.overflow = prevState.flyoutOpen ? 'auto' : 'hidden';
      return { flyoutOpen: !prevState.flyoutOpen };
    });
  }

  render() {
    const { auth: { user }, config, config: { header: { floating, smallLogo, stayAsLink, transparent, withCheckoutSteps, withSearchBar } } } = this.props;
    const { currentPage, flyoutOpen } = this.state;
    return (
      <div className={css(styles.headerWrapper, floating && styles.headerWrapperSticky)}>
        <header
          className={css(styles.header)}
          role="banner"
        >
          <div className={css(styles.headerContainer, floating && styles.headerContainerSticky, transparent && styles.headerContainerTransparent)}>
            <NavProvider>
              <div className={css(styles.navTable)}>
                <div className={css(pagestyles.tableCellMiddle)}>
                  <div>
                    <Logo
                      flyoutOpen={flyoutOpen}
                      handleFlyoutMenu={this.toggleFlyout}
                      smallLogo={smallLogo}
                      stayAsLink={stayAsLink}
                    />
                    <NavContext.Consumer>
                      {(context: ContextValue) => (
                        <FlyoutMenu
                          config={config}
                          flyoutOpen={flyoutOpen}
                          {...context}
                        />
                      )}
                    </NavContext.Consumer>
                  </div>
                </div>
                <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                  {withSearchBar &&
                    <SearchBar />
                  }
                  {withCheckoutSteps &&
                    <ProductLargeScreen>
                      <CheckoutSteps
                        currentPage={currentPage}
                        handleOnClick={this.handlePageChange}
                      />
                    </ProductLargeScreen>
                  }
                </div>
                {!withCheckoutSteps &&
                  <div
                    className={css(pagestyles.tableCellMiddle)}
                    id="nav"
                  >
                    <NavContext.Consumer>
                      {(context: ContextValue) => (
                        <Nav
                          config={config}
                          user={user}
                          {...context}
                        />
                      )}
                    </NavContext.Consumer>
                  </div>
                }
              </div>
            </NavProvider>
          </div>
        </header>
      </div>
    );
  }
}

export default useAuth(useConfig(Header));
