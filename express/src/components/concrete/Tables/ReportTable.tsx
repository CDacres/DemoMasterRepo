/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Table from '@src/components/concrete/Table';
import PopupMenu from '@src/components/concrete/Table/InteractionTable/PopupMenu';
import HeaderButton from '@src/components/concrete/Table/InteractionTable/Buttons/HeaderButton';
import ColumnHeaderButton from '@src/components/concrete/Table/InteractionTable/ColumnHeader/ColumnHeaderButton';
import PopupCell from '@src/components/concrete/Table/InteractionTable/Cells/PopupCell';
import TextCell from '@src/components/concrete/Table/InteractionTable/Cells/TextCell';
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';
import { Arrow, Settings, ShareWithOther } from '@src/components/concrete/Icons/svgs';

// Data
import { report } from '@src/data/business/tables';
import { columns } from '@src/data/business/tableDropdownOptions';

class ReportTable extends React.Component {
  rowMenu = (index: number) => {
    return [
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'users.email_user',
      },
    ];
  }

  render() {
    const buttons = [
      (
        <PopupMenu
          buttonText="common.dates"
          header={true}
          key="0"
          offset={{ right: 619 }}
          type="datepicker"
        />
      ),
      (
        <HeaderButton
          // action={() => {}} // TODO: make this a proper action
          isWhite={true}
          key={1}
          text="business.export_csv"
        />
      ),
    ];
    const heads = [
      (
        <tr
          className={css(styles.tr)}
          key={0}
        >
          <th className={css(styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <StyledCheckbox
              id="header_checkbox"
              name="header_checkbox"
            />
            {/* TODO: add action for check */}
          </th>
          <th className={css(styles.idColumn, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.id"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="business.employee"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.location"
            />
          </th>
          <th className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.dates"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.duration"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.people"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.total"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="business.payee"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.leftText, padding.all_1)}>
            <PopupCell>
              <PopupMenu
                buttonChild={<Settings stylesArray={[pagestyles.icon, pagestyles.icon18]} />}
                checkboxes={columns.report}
                title="common.show_columns"
                type="checks"
              />
            </PopupCell>
          </th>
        </tr>
      ),
    ];
    const rows = report.map((row, index) => (
      <tr
        className={css(styles.tr)}
        key={index}
      >
        <td className={css(styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <StyledCheckbox
            id={`row_${index}_checkbox`}
            name={`row_${index}_checkbox`}
          />
          {/* TODO: add action for check */}
        </td>
        <td className={css(styles.idColumn, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.id} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.employee} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.location} />
        </td>
        <td className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell
            isDateTime={true}
            text={row.date_from}
          />
          <div className={css(pagestyles.inlineBlock, margin.leftright_1_5)}>
            <Arrow
              direction="right"
              stylesArray={[pagestyles.icon, pagestyles.icon12]}
            />
          </div>
          <TextCell
            isDateTime={true}
            text={row.date_to}
          />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.duration} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.people} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.total} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.payee} />
        </td>
        <td className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.centeredText, padding.topbottom_2, padding.leftright_1)}>
          <PopupCell>
            <PopupMenu
              buttonChild={<ShareWithOther stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconGrey]} />}
              data={this.rowMenu(index)}
              type="list"
            />
          </PopupCell>
        </td>
      </tr>
    ));
    return (
      <Table
        buttonItems={buttons}
        fullSize={true}
        headerItems={heads}
        noMargin={true}
        rowItems={rows}
      />
    );
  }
}

export default ReportTable;
