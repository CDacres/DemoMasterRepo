import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  count: number;
  itemRender: (i: number) => React.ReactNode;
  onChanged: (i: number) => void;
  value: number;
};

class Tabs extends React.Component<Props> {

  handleClick = (i: number) => (e) => {
    e.preventDefault();
    const { onChanged: onSelected } = this.props;
    if (onSelected) {
      onSelected(i);
    }
  }

  render() {
    const { count, itemRender, value: selected } = this.props;
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(
        <div
          className={css(styles.buttonContainer)}
          key={items.length}
        >
          <button
            aria-busy="false"
            aria-selected="false"
            className={css(i === selected ? styles.buttonSelected : styles.buttonNormal)}
            onClick={this.handleClick(i)}
            role="tab"
            type="button"
          >
            {itemRender(i)}
          </button>
        </div>
      );
    }
    return (
      <div className={css(styles.container, styles.text)}>
        {items}
      </div>
    );
  }
}

export default Tabs;
