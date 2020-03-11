import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import guestInputStyles from '../../styles';
import { pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  i: number;
  onClick: (value: string | number) => void;
};

class ListItem extends React.PureComponent<Props> {
  handleClick = () => {
    const { i } = this.props;
    this.props.onClick(i);
  }

  render() {
    const { i } = this.props;
    return (
      <li
        className={css(guestInputStyles.guestPanelDropdownItem)}
        onClick={this.handleClick}
      >
        <div className={css(guestInputStyles.guestPanelDropdownItemTextContainer, pagestyles.tableCellTop)}>
          <Translatable content={{ transKey: 'common.people_count', count: i, replacements: { number: i } }}>
            <div className={css(guestInputStyles.guestPanelDropdownItemFiltersText)} />
          </Translatable>
        </div>
      </li>
    );
  }
}

export default ListItem;
