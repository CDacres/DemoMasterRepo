import * as React from 'react';
import shortid from 'shortid';

// Data
import { discoverColumn, joinColumn, socialColumn, zipcubeColumn } from '@src/data/footer';

// Connectors
import { useConfig } from '@src/store/connectors';

// Components
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import FooterComponent from '@src/components/concrete/Footer/FooterComponent';
import LinkListItem from '@src/components/concrete/Footer/LinkListItem';
import SquashedToggleButton from '@src/components/concrete/Footer/SquashedToggleButton';

// Types
import { Link, Store } from '@src/typings/types';

type LangLinks = {
  [lang: string]: Link[];
};

type Props = {
  config: Store.Config;
};

type State = {
  isShowing: boolean;
};

const defaultState: State = { isShowing: false };

class FooterContainer extends React.PureComponent<Props, State> {
  protected discoverColumn;
  protected joinColumn;
  protected socialColumn;
  protected zipcubeColumn;

  constructor(props: Props) {
    super(props);
    this.state = defaultState;
    const { config: { language } } = props;
    this.discoverColumn = this.renderLinkListItemsByLang(discoverColumn, language);
    this.joinColumn = this.renderLinkListItems(joinColumn);
    this.socialColumn = this.renderLinkListItems(socialColumn);
    this.zipcubeColumn = this.renderLinkListItems(zipcubeColumn);
  }

  toggleVisibility = (): void => {
    this.setState(({ isShowing }) => ({ isShowing: !isShowing }));
  }

  renderLinkListItems = (links: Link[]) => {
    return links.map((link: Link) => (
      <LinkListItem
        key={shortid.generate()}
        link={link}
      />
    ));
  }

  renderLinkListItemsByLang = (links: LangLinks, language?: string) => {
    return links[language].map((link: Link) => (
      <LinkListItem
        key={shortid.generate()}
        link={link}
      />
    ));
  }

  render() {
    const { config: { footer: { squashed } } } = this.props;
    return (
      <ProductLargeScreen>
        {matches => {
          if (matches) {
            return (
              <React.Fragment>
                <FooterComponent
                  discoverColumn={this.discoverColumn}
                  isShowing={this.state.isShowing}
                  joinColumn={this.joinColumn}
                  socialColumn={this.socialColumn}
                  zipcubeColumn={this.zipcubeColumn}
                  {...this.props}
                />
                {squashed &&
                  <SquashedToggleButton
                    toggleVisibility={this.toggleVisibility}
                    isShowing={this.state.isShowing}
                  />
                }
              </React.Fragment>
            );
          }
          return null;
        }}
      </ProductLargeScreen>
    );
  }
}

export default useConfig(FooterContainer);
