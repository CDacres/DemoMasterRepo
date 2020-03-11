import * as React from 'react';
import Collapse from 'react-collapse';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import InteractionLink from '@src/components/concrete/InteractionLink';

// Types
import { RoomMenuSpecial } from '@src/typings/types';

type Props = {
  asterisk?: string;
  specials: RoomMenuSpecial[];
  tableData?: any[];
};

type State = {
  isCollapsed: boolean;
  rowLimit: number;
  table?: any;
};

class MenuTable extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isCollapsed: false,
      rowLimit: 4,
      table: this.buildTableData(),
    };
  }

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  }

  transformHeaderName = (tHeaders: any): any => {
    const headers = [];
    Object.keys(tHeaders).forEach(name => {
      headers.push(name.replace('_', ' '));
    });
    return headers;
  }

  buildTableData() {
    const { tableData } = this.props;
    const table = tableData.reduce((prev, next, index) => {
      if (!prev.header) {
        prev.header = this.transformHeaderName(next);
      }
      if (!prev.rows) {
        prev.rows = [];
      }
      prev.rows[index] = [];
      for (const key in next) {
        if (key in next) {
          prev.rows[index].push(next[key]);
        }
      }
      return prev;
    }, {});
    return table;
  }

  buildTableRows = () => {
    const { asterisk } = this.props;
    const { isCollapsed, rowLimit, table } = this.state;
    return table.rows && table.rows.map((row, index) => {
      if (index >= rowLimit && !isCollapsed) {
        return;
      }
      return (
        <div
          className={css(styles.tableBodyRow)}
          key={Object.keys(table.rows)[index]}
        >
          {row.map((tRow, i) => {
            let highlighted = null;
            let highlightedText = null;
            if (table.header[i] === asterisk && tRow) {
              highlighted = styles.highlightedCol;
              highlightedText = [styles.highlightedText, padding.topbottom_1_25];
            }
            return (
              <div
                className={css(styles.tableBodyCol, highlighted)}
                key={table.header[i]}
              >
                <Translatable content={{ transKey: tRow ? String(tRow) : ' ' }}>
                  <span className={css(highlightedText)} />
                </Translatable>
              </div>
            );
          })}
        </div>
      );
    });
  }

  buildTableHeader = () => {
    const { asterisk } = this.props;
    const { table } = this.state;
    return table.header && table.header.map(tHeader => {
      let highlighted = '';
      if (tHeader === asterisk) {
        tHeader = `${tHeader}*`;
        highlighted = 'highlightedHeader';
      }
      return (
        <Translatable
          content={{ transKey: tHeader }}
          key={tHeader}
        >
          <span className={css(styles.tableHeaderCol, styles[highlighted])} />
        </Translatable>
      );
    });
  }

  render() {
    const { specials } = this.props;
    const { isCollapsed, rowLimit, table } = this.state;
    return (
      <div className={css(styles.fullWidth)}>
        <div className={css(styles.tableHeader)}>
          <div className={css(styles.innerWrapper)}>
            <div className={css(styles.tableHeaderRow)}>
              {this.buildTableHeader()}
            </div>
          </div>
        </div>
        <div>
          <Collapse isOpened={true}>
            {this.buildTableRows()}
            {isCollapsed && specials &&
              <div className={css(styles.tableFooter)}>
                <ContentSeparator marginNum={2} />
                <div className={css(styles.eatsWrapper)}>
                {specials.map(item => (
                  <div
                    className={css(styles.eatIn, !item.available ? styles.unavailable : null)}
                    key={item.id}
                  >
                    <Translatable content={{ transKey: item.name }}>
                      <span className={css(pagestyles.block, margin.all_0)} />
                    </Translatable>
                    <Translatable content={{ transKey: item.desc }}>
                      <small />
                    </Translatable>
                  </div>
                ))}
                </div>
              </div>
            }
          </Collapse>
          {((table.rows && table.rows.length > rowLimit) || (specials && specials.length > 0)) &&
            <div>
              <InteractionLink
                action={this.handleClick}
                className={css(styles.collapsable, pagestyles.link)}
              >
                <Translatable content={{ transKey: isCollapsed ? 'room.read_less' : 'room.read_more' }} />
              </InteractionLink>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default MenuTable;
