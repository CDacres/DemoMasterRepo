import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import DisplayTable from '@src/components/concrete/Table/DisplayTable';
import { CheckItem, Cross } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

const SafetyTable = () => {
  const smallHeads = [
    (
      <tr key={0}>
        <th className={css(styles.mainDisplayHead, styles.beforeHighlighted, padding.leftright_1)}>
          <Translatable content={{ transKey: 'info.head_require' }}>
            <span className={css(pagestyles.title, pagestyles.fontBlack, margin.all_0, padding.topbottom_0_25)} />
          </Translatable>
        </th>
      </tr>
    ),
  ];
  const largeHeads = [
    (
      <tr key={0}>
        <th className={css(styles.mainDisplayHead, styles.beforeHighlighted, padding.leftright_1)}>
          <Translatable content={{ transKey: 'info.head_require' }}>
            <span className={css(pagestyles.title, pagestyles.fontBlack, margin.all_0, padding.topbottom_0_25)} />
          </Translatable>
        </th>
        <th className={css(styles.displayCell, styles.highlightedHead, padding.leftright_1)}>
          <div className={css(styles.highlightedHeadInner)}>
            <Translatable content={{ transKey: 'Zipcube' }}>
              <div className={css(pagestyles.smallText, pagestyles.fontBook, margin.all_0)} />
            </Translatable>
          </div>
        </th>
        <th className={css(styles.displayCell, styles.followingHighlightedHead, padding.leftright_1)}>
          <div>
            <Translatable content={{ transKey: 'HomeAway' }}>
              <div className={css(pagestyles.smallText, pagestyles.fontBook, margin.all_0)} />
            </Translatable>
          </div>
        </th>
        <th className={css(styles.displayCell, padding.leftright_1)}>
          <div>
            <Translatable content={{ transKey: 'Booking.com' }}>
              <div className={css(pagestyles.smallText, pagestyles.fontBook, margin.all_0)} />
            </Translatable>
          </div>
        </th>
      </tr>
    ),
  ];
  const smallRows = [
    (
      <tr key={0}>
        <td className={css(styles.descColumn, styles.beforeHighlighted, padding.leftright_1)}>
          <Translatable content={{ transKey: 'info.row_phone' }}>
            <div className={css(pagestyles.smallText, margin.all_0)} />
          </Translatable>
        </td>
      </tr>
    ),
    (
      <tr key={1}>
        <td className={css(styles.descColumn, styles.beforeHighlighted, padding.leftright_1)}>
          <Translatable content={{ transKey: 'info.row_agreement' }}>
            <div className={css(pagestyles.smallText, margin.all_0)} />
          </Translatable>
        </td>
      </tr>
    ),
    (
      <tr key={2}>
        <td className={css(styles.descColumn, styles.beforeHighlighted, padding.leftright_1)}>
          <Translatable content={{ transKey: 'info.row_government_id' }}>
            <div className={css(pagestyles.smallText, margin.all_0)} />
          </Translatable>
        </td>
      </tr>
    ),
    (
      <tr key={3}>
        <td className={css(styles.descColumn, styles.beforeHighlighted, padding.leftright_1)}>
          <Translatable content={{ transKey: 'info.row_positive_review' }}>
            <div className={css(pagestyles.smallText, margin.all_0)} />
          </Translatable>
        </td>
      </tr>
    ),
    (
      <tr key={4}>
        <td className={css(styles.descColumn, styles.beforeHighlighted, padding.leftright_1)}>
          <Translatable content={{ transKey: 'info.row_message' }}>
            <div className={css(pagestyles.smallText, margin.all_0)} />
          </Translatable>
        </td>
      </tr>
    ),
  ];
  const largeRows = [
    (
      <tr key={0}>
        <td className={css(styles.descColumn, styles.beforeHighlighted, padding.leftright_1)}>
          <Translatable content={{ transKey: 'info.row_phone' }}>
            <div className={css(pagestyles.smallText, margin.all_0)} />
          </Translatable>
        </td>
        <td className={css(styles.displayCell, padding.leftright_1)}>
          <div>
            <CheckItem />
          </div>
        </td>
        <td className={css(styles.displayCell, styles.followingHighlightedHead, padding.leftright_1)}>
          <div>
            <Cross />
          </div>
        </td>
        <td className={css(styles.displayCell, padding.leftright_1)}>
          <div>
            <CheckItem />
          </div>
        </td>
      </tr>
    ),
    (
      <tr key={1}>
        <td className={css(styles.descColumn, styles.beforeHighlighted, padding.leftright_1)}>
          <Translatable content={{ transKey: 'info.row_agreement' }}>
            <div className={css(pagestyles.smallText, margin.all_0)} />
          </Translatable>
        </td>
        <td className={css(styles.displayCell, padding.leftright_1)}>
          <div>
            <CheckItem />
          </div>
        </td>
        <td className={css(styles.displayCell, styles.followingHighlightedHead, padding.leftright_1)}>
          <div>
            <CheckItem />
          </div>
        </td>
        <td className={css(styles.displayCell, padding.leftright_1)}>
          <div>
            <CheckItem />
          </div>
        </td>
      </tr>
    ),
    (
      <tr key={2}>
        <td className={css(styles.descColumn, styles.beforeHighlighted, padding.leftright_1)}>
          <Translatable content={{ transKey: 'info.row_government_id' }}>
            <div className={css(pagestyles.smallText, margin.all_0)} />
          </Translatable>
        </td>
        <td className={css(styles.displayCell, padding.leftright_1)}>
          <div>
            <CheckItem />
          </div>
        </td>
        <td className={css(styles.displayCell, styles.followingHighlightedHead, padding.leftright_1)}>
          <div>
            <CheckItem />
          </div>
        </td>
        <td className={css(styles.displayCell, padding.leftright_1)}>
          <div>
            <Cross />
          </div>
        </td>
      </tr>
    ),
    (
      <tr key={3}>
        <td className={css(styles.descColumn, styles.beforeHighlighted, padding.leftright_1)}>
          <Translatable content={{ transKey: 'info.row_positive_review' }}>
            <div className={css(pagestyles.smallText, margin.all_0)} />
          </Translatable>
        </td>
        <td className={css(styles.displayCell, padding.leftright_1)}>
          <div>
            <CheckItem />
          </div>
        </td>
        <td className={css(styles.displayCell, styles.followingHighlightedHead, padding.leftright_1)}>
          <div>
            <Cross />
          </div>
        </td>
        <td className={css(styles.displayCell, padding.leftright_1)}>
          <div>
            <Cross />
          </div>
        </td>
      </tr>
    ),
    (
      <tr key={4}>
        <td className={css(styles.descColumn, styles.beforeHighlighted, padding.leftright_1)}>
          <Translatable content={{ transKey: 'info.row_message' }}>
            <div className={css(pagestyles.smallText, margin.all_0)} />
          </Translatable>
        </td>
        <td className={css(styles.displayCell, styles.highlightedCell, padding.leftright_1)}>
          <div className={css(styles.highlightedCellInner)}>
            <CheckItem />
          </div>
        </td>
        <td className={css(styles.displayCell, styles.followingHighlightedHead, padding.leftright_1)}>
          <div>
            <Cross />
          </div>
        </td>
        <td className={css(styles.displayCell, padding.leftright_1)}>
          <div>
            <Cross />
          </div>
        </td>
      </tr>
    ),
  ];
  return (
    <DisplayTable
      headerItems={{
        large: largeHeads,
        small: smallHeads,
      }}
      rowItems={{
        large: largeRows,
        small: smallRows,
      }}
    />
  );
};

export default SafetyTable;
