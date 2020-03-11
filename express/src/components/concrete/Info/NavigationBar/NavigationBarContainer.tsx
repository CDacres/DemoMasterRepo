import * as React from 'react';

// Components
import NavigationBarComponent from '@src/components/concrete/Info/NavigationBar/NavigationBarComponent';

type Props = {
  buttonHref: string;
  buttonText: string;
  pageId: string;
  tabs: Array<{
    href: string;
    id: string;
    text: string;
  }>;
};

type State = {
  sticky: boolean;
};

class NavigationBarContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { sticky: false };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fixMenu);
    window.addEventListener('resize', this.fixMenu);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixMenu);
    window.removeEventListener('resize', this.fixMenu);
  }

  fixMenu = (): void => {
    const width = window.innerWidth;
    const scrollY = window.scrollY;
    if ((width > 743 && scrollY > 82) || (width < 744 && scrollY > 65)) {
      // TODO: hard coded, probably needs to be found based on proper page height/scroll
      this.setState({ sticky: true });
    } else {
      this.setState({ sticky: false });
    }
  }

  render() {
    const { buttonText, buttonHref, pageId, tabs } = this.props;
    const { sticky } = this.state;
    return (
      <NavigationBarComponent
        buttonText={buttonText}
        buttonHref={buttonHref}
        pageId={pageId}
        sticky={sticky}
        tabs={tabs}
      />
    );
  }
}

export default NavigationBarContainer;
