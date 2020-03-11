/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

// Components
import Table from '@src/components/concrete/Table';
import ColumnHeaderButton from '@src/components/concrete/Table/InteractionTable/ColumnHeader/ColumnHeaderButton';
import TextCell from '@src/components/concrete/Table/InteractionTable/Cells/TextCell';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Data
import { review } from '@src/data/dashboard/tables';

const ReviewTable = () => {
  const heads = [
    (
      <tr
        className={css(styles.tr)}
        key={0}
      >
        <th className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
          <ColumnHeaderButton
            // action={() => {}} // TODO: make this a proper action
            text="dashboard.reviews_date_sent"
          />
        </th>
        <th className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
          <ColumnHeaderButton
            // action={() => {}} // TODO: make this a proper action
            text="users.first_name"
          />
        </th>
        <th className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
          <ColumnHeaderButton
            // action={() => {}} // TODO: make this a proper action
            text="users.email"
          />
        </th>
        <th className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
          <ColumnHeaderButton
            // action={() => {}} // TODO: make this a proper action
            text="common.venue_name"
          />
        </th>
        <th className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
          <ColumnHeaderButton
            // action={() => {}} // TODO: make this a proper action
            text="common.status"
          />
        </th>
      </tr>
    ),
  ];
  const rows = review.map((row, index) => (
    <tr
      className={css(styles.tr)}
      key={index}
    >
      <td className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
        <TextCell
          isDateTime={true}
          text={row.date}
        />
      </td>
      <td className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
        <TextCell text={row.first_name} />
      </td>
      <td className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
        <TextCell text={row.email} />
      </td>
      <td className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
        <TextCell text={row.venue_name} />
      </td>
      <td className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
        <TextCell text={row.status} />
      </td>
    </tr>
  ));
  return (
    <Translatable attributes={{ title: { transKey: 'common.reviews_title' } }}>
      <Table
        headerItems={heads}
        noMargin={true}
        rowItems={rows}
      />
    </Translatable>
  );
};

export default ReviewTable;
