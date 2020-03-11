/* tslint:disable:max-line-length */
import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import moment from 'moment';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';
import GenericCard from '@src/components/concrete/GenericCard';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import CheckboxColumns from '@src/components/concrete/Table/InteractionTable/CheckboxColumns';
import HeaderButton from '@src/components/concrete/Table/InteractionTable/Buttons/HeaderButton';
import DatepickerRange from '@src/components/concrete/Datepicker/DatepickerRange';

// Types
import { ActionLink, ButtonProps, StyledCheckboxProps } from '@src/typings/types';

type Props = {
  buttonChild?: JSX.Element;
  buttonText?: string;
  checkboxes?: StyledCheckboxProps[][];
  data?: Array<{ text: string } & ActionLink & ButtonProps>;
  header?: boolean;
  offset?: {
    bottom?: number;
    right?: number;
  };
  title?: string;
  type?: 'list' | 'checks' | 'datepicker';
};

type State = {
  bottomPos: number;
  opened: boolean;
  rightPos: number;
};

class PopupMenu extends React.Component<Props, State> {
  protected buttonEnc;

  constructor(props: Props) {
    super(props);
    this.state = {
      bottomPos: 0,
      opened: false,
      rightPos: 0,
    };
    this.buttonEnc = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('wheel', this.getPosition);
    window.addEventListener('resize', this.getPosition);
  }

  componentWillUnmount() {
    document.removeEventListener('wheel', this.getPosition);
    window.removeEventListener('resize', this.getPosition);
  }

  getPosition = () => {
    this.setState({
      bottomPos: this.buttonEnc.current.getBoundingClientRect().bottom,
      rightPos: this.buttonEnc.current.getBoundingClientRect().right,
    });
  }

  handleButtonClick = () => {
    this.getPosition();
    this.setState({ opened: !this.state.opened });
  }

  handleClickOutside = () => {
    this.setState({ opened: false });
  }

  render() {
    const { buttonChild, buttonText, checkboxes, data, header, offset, title, type } = this.props;
    const { bottomPos, opened, rightPos } = this.state;
    return (
      <div className={css(pagestyles.tableCellMiddle)}>
        <div ref={this.buttonEnc}>
          {header ? (
            <HeaderButton
              action={this.handleButtonClick}
              text={buttonText}
            />
          ) : (
            <Button
              action={this.handleButtonClick}
              stylesArray={[styles.button, padding.all_1]}
            >
              {buttonChild}
            </Button>
          )}
        </div>
        {opened &&
          <div
            className={css(styles.wrapper)}
            style={{ transform: `translate(${rightPos - (offset && offset.right ? offset.right : 0)}px, ${bottomPos - (offset && offset.bottom ? offset.bottom : 0)}px)` }}
          >
            {(type === 'list' || type === 'checks') ? (
              <GenericCard
                borderColor="rgba(0, 0, 0, 0.2)"
                boxShadow="0px 14px 36px 2px rgba(0, 0, 0, 0.15)"
                customStyle={styles.container}
                padding="0px"
              >
                {type === 'list' ? (
                  <ul className={css(styles.itemContainer, styles.list, margin.all_0, padding.all_0)}>
                    {data.map((item, index) => (
                      <li
                        key={index}
                        role="none"
                      >
                        <Translatable content={{ transKey: item.text }}>
                          <Button
                            action={item.action}
                            href={item.href}
                            stylesArray={[styles.link]}
                          />
                        </Translatable>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className={css(styles.itemContainer, styles.checks, margin.all_0, padding.all_0)}>
                    <div className={css(margin.topbottom_2, margin.leftright_3)}>
                      <div className={css(margin.bottom_0_5)}>
                        <Translatable content={{ transKey: title }}>
                          <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
                        </Translatable>
                      </div>
                      <CheckboxColumns checkboxes={checkboxes} />
                    </div>
                  </div>
                )}
              </GenericCard>
            ) : (type === 'datepicker' ? (
              <DatepickerRange
                date={moment()}
                datepickerLang="en-GB"
                numberOfMonths={2}
                onChange={() => {}} // TODO: make this a proper action
              />
            ) : (
              null
            ))}
          </div>
        }
      </div>
    );
  }
}

export default onClickOutside(PopupMenu);
