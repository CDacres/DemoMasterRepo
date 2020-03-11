/* tslint:disable:max-line-length */
import * as React from 'react';
import shortid from 'shortid';

// Components
import CarouselComponent from '@src/components/concrete/Carousel/CarouselComponent';
import BrowserLink from '@src/components/abstract/Link';

// Types
import { CarouselOptionProps, LinkComponentProps } from '@src/typings/types';

type OptionType = React.ComponentClass | ((props: CarouselOptionProps) => JSX.Element);

type Props = {
  footerLink?: string;
  footerText?: string;
  id: string;
  isSlider?: boolean;
  lazyLoadImages?: boolean;
  linkComponent?: LinkComponent;
  linkComponentProps?: LinkComponentProps;
  maxOptions?: {
    large?: number;
    small?: number;
  };
  options: object[];
  optionTemplate: OptionType;
  sectionSubtitle?: string;
  sectionTitle?: string;
  threeImg?: boolean;
  type?: string;
  with3?: boolean;
};

type State = {
  translateMultiplier: number;
};

type LinkComponent = React.ComponentClass<any, any>;

class CarouselContainer extends React.Component<Props, State> {
  static defaultProps = {
    isSlider: false,
    lazyLoadImages: false,
    linkComponent: BrowserLink,
    maxOptions: {
      large: 3,
      small: 5,
    },
    sectionSubtitle: false,
    threeImg: false,
    type: 'small',
    with3: false,
  };

  protected translateDenominator;
  protected options;
  private _resizeTimeout;

  constructor(props: Props) {
    super(props);
    this.state = { translateMultiplier: 0 };
    this.translateDenominator = this.props.type === 'large' ? 3 : this.props.type === 'smallwithoutimage' ? 2 : 5;
    this.options = this.renderOptions();
  }

  componentDidMount() {
    this.calculateTranslateDenominator();
    window.addEventListener('resize', this.resizeThrottler, false);
  }

  shouldComponentUpdate(_: Props, nextState: State) {
    if (nextState.translateMultiplier !== this.state.translateMultiplier) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeThrottler);
  }

  calculateTranslateDenominator = () => {
    const bodyWidth = document.body.clientWidth;
    if (this.props.type === 'largeimage') {
      switch (this.props.maxOptions.large) {
        case 8:

        if (bodyWidth >= 1440) {
          this.translateDenominator = 8;
        } else if (bodyWidth >= 1128 && bodyWidth <= 1439) {
          this.translateDenominator = 6;
        } else if (bodyWidth >= 744 && bodyWidth <= 1127) {
          this.translateDenominator = 5;
        } else {
          this.translateDenominator = 1;
        }
        break;

        case 7:

        if (bodyWidth >= 1440) {
          this.translateDenominator = 7;
        } else if (bodyWidth >= 1128 && bodyWidth <= 1439) {
          this.translateDenominator = 6;
        } else if (bodyWidth >= 744 && bodyWidth <= 1127) {
          this.translateDenominator = 5;
        } else {
          this.translateDenominator = 1;
        }
        break;

        default:

        if (bodyWidth >= 1440) {
          this.translateDenominator = 5;
        } else if (bodyWidth >= 744 && bodyWidth <= 1439) {
          this.translateDenominator = 4;
        } else {
          this.translateDenominator = 1;
        }
        break;
      }
    } else if (this.props.type !== 'large') {
      if (this.props.type !== 'smallwithoutimage') {
        switch (this.props.maxOptions.small) {
          case 6:

          if (bodyWidth >= 1720) {
            this.translateDenominator = 6;
          } else if (bodyWidth >= 1460 && bodyWidth <= 1719) {
            this.translateDenominator = 5;
          } else if (bodyWidth >= 1200 && bodyWidth <= 1459) {
            this.translateDenominator = 4;
          } else if (bodyWidth >= 940 && bodyWidth <= 1199) {
            this.translateDenominator = 3;
          } else {
            this.translateDenominator = 2;
          }
          break;

          case 4:

          if (bodyWidth >= 1440) {
            this.translateDenominator = 4;
          } else if (bodyWidth >= 744 && bodyWidth <= 1439) {
            this.translateDenominator = 3;
          } else {
            this.translateDenominator = 1;
          }
          break;

          case 3:

          if (bodyWidth >= 744) {
            this.translateDenominator = 3;
          } else {
            this.translateDenominator = 1;
          }
          break;

          default:

          if (bodyWidth >= 1460) {
            this.translateDenominator = 5;
          } else if (bodyWidth >= 1200 && bodyWidth <= 1459) {
            this.translateDenominator = 4;
          } else if (bodyWidth >= 940 && bodyWidth <= 1199) {
            this.translateDenominator = 3;
          } else {
            this.translateDenominator = 2;
          }
          break;
        }
      }
    } else {
      switch (this.props.maxOptions.large) {
        case 5:

        if (bodyWidth >= 1660) {
          this.translateDenominator = 5;
        } else if (bodyWidth >= 1360 && bodyWidth <= 1659) {
          this.translateDenominator = 4;
        } else if (bodyWidth >= 1060 && bodyWidth <= 1359) {
          this.translateDenominator = 3;
        } else if (bodyWidth >= 760 && bodyWidth <= 1059) {
          this.translateDenominator = 2;
        } else {
          this.translateDenominator = 1;
        }
        break;

        default:

        if (bodyWidth >= 1128) {
          this.translateDenominator = 3;
        } else if (bodyWidth >= 768 && bodyWidth <= 1127) {
          this.translateDenominator = 2;
        } else {
          this.translateDenominator = 1;
        }
        break;
      }
    }
  }

  getTranslateX = () => {
    const translateNumerator = 100;
    return (this.state.translateMultiplier * (translateNumerator / this.translateDenominator));
  }

  // getCurrentlyShown = (index) => {
  //   const positiveMultipler = Math.abs(this.state.translateMultiplier);
  //   return ((positiveMultipler === 0 && ((index + 1) <= this.translateDenominator)) || (positiveMultipler > 0 && ((index + 1) > positiveMultipler) && ((index + 1) <= (positiveMultipler + this.translateDenominator))))
  // } // TODO: this changes the currentlyShown boolean (to add hidden class), however it requires the renderOptions to be reloaded rather than just in constructor ie. you can see it reloading, fix this

  handleSlide = direction => {
    this.slide(this[direction]);
  }

  left = translateMultiplier => translateMultiplier + 1;

  renderOptions = () => {
    const { id, lazyLoadImages, linkComponent, linkComponentProps, maxOptions, options, optionTemplate, threeImg, with3 } = this.props;
    const OptionTemplate: OptionType = optionTemplate;
    return options.map((props, index) => (
      <OptionTemplate
        // currentlyShown={this.getCurrentlyShown(index)}
        currentlyShown={true}
        imageId={`${id}_${index}`}
        isFirst={index === 0}
        isLast={index === options.length - 1}
        key={shortid.generate()}
        lazyLoadImages={lazyLoadImages}
        linkComponent={linkComponent}
        linkComponentProps={linkComponentProps}
        maxOptions={maxOptions}
        threeImg={threeImg}
        with3={with3}
        {...props}
      />
    ));
  }

  resizeThrottler = () => {
    if (!this._resizeTimeout) {
      this._resizeTimeout = setTimeout(() => {
        this._resizeTimeout = null;
        this.calculateTranslateDenominator();
      }, 66);
    }
    // TODO: reset TranslateX amount when screen resized
  }

  right = translateMultiplier => translateMultiplier - 1;

  slide = direction => {
    this.setState(({ translateMultiplier }) => {
      return {
        translateMultiplier: direction(translateMultiplier),
      };
    });
  }

  render() {
    const { footerLink, footerText, isSlider, sectionSubtitle, sectionTitle, type } = this.props;
    const { translateMultiplier } = this.state;
    return (
      <CarouselComponent
        footerLink={footerLink}
        footerText={footerText}
        getTranslateX={this.getTranslateX}
        isSlider={isSlider}
        onSlide={this.handleSlide}
        options={this.options}
        // options={this.renderOptions()}
        sectionSubtitle={sectionSubtitle}
        sectionTitle={sectionTitle}
        translateDenominator={this.translateDenominator}
        translateMultiplier={translateMultiplier}
        type={type}
      />
    );
  }
}

export default CarouselContainer;
