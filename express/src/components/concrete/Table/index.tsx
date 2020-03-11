/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import InteractionTable from '@src/components/concrete/Table/InteractionTable';
import NormalHeader from '@src/components/concrete/Table/InteractionTable/Headers/NormalHeader';
import SelectedHeader from '@src/components/concrete/Table/InteractionTable/Headers/SelectedHeader';

type Props = {
  buttonItems?: JSX.Element[];
  filterItems?: JSX.Element[];
  fullSize?: boolean;
  headerItems: JSX.Element[];
  noMargin?: boolean;
  rowItems: JSX.Element[];
  title?: string;
};

type State = {
  checkboxSelected: boolean;
  stickyHeader: boolean;
  typingOn: boolean;
};

class Table extends React.Component<Props, State> {
  protected header;

  constructor(props: Props) {
    super(props);
    this.state = {
      checkboxSelected: false,
      stickyHeader: false,
      typingOn: false,
    };
    this.header = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScreenScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScreenScroll);
  }

  handleScreenScroll = () => {
    if (this.header.current.getBoundingClientRect().top < 0) {
      this.setState({ stickyHeader: true });
    } else {
      this.setState({ stickyHeader: false });
    }
  }

  enableTypingStyle = () => {
    this.setState({ typingOn: true });
  }

  handleCancelClick = () => {
    // TODO: make this a proper action
  }

  handleSaveClick = () => {
    // TODO: make this a proper action
  }

  render() {
    const { buttonItems, filterItems, fullSize, headerItems, noMargin, rowItems, title } = this.props;
    const { checkboxSelected, stickyHeader, typingOn } = this.state;
    return (
      <main>
        <div {...(!noMargin ? { className: css(margin.top_2, margin.leftright_3) } : {})}>
          <div className={css(margin.bottom_3)} />
          <div ref={this.header}>
            <div className={css(styles.headerWrapper)}>
              <div {...(stickyHeader ? { className: css(styles.stickyContainer) } : {})}>
                <div className={css(stickyHeader ? fullSize ? styles.stickyFullScreen : styles.stickyInner : pagestyles.relativePosition)}>
                  {checkboxSelected ? (
                    <SelectedHeader
                      handleCancelClick={this.handleCancelClick}
                      handleSaveClick={this.handleSaveClick}
                      title="1 row selected" // TODO: hardcoded lang
                    />
                  ) : (
                    <NormalHeader
                      buttonSection={(buttonItems && buttonItems.length > 0) &&
                        <React.Fragment>
                          {buttonItems.map((item, index) => (
                            <React.Fragment key={index}>
                              {item}
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      }
                      filterSection={filterItems &&
                        <React.Fragment>
                          {filterItems.map((item, index) => (
                            <React.Fragment key={index}>
                              {item}
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      }
                      sticky={stickyHeader}
                      title={title}
                      typingOn={typingOn}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <InteractionTable
            headerItems={headerItems}
            rowItems={rowItems}
          />
          <div className={css(margin.topbottom_1)} />
        </div>
        <div className={css(styles.space, padding.leftright_2)} />
      </main>
    );
  }
}

export default Table;
