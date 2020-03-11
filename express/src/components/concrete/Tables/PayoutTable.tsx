/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Table from '@src/components/concrete/Table';
import CheckboxColumns from '@src/components/concrete/Table/InteractionTable/CheckboxColumns';
import PopupMenu from '@src/components/concrete/Table/InteractionTable/PopupMenu';
import FilterSectionTitle from '@src/components/concrete/Table/InteractionTable/Headers/NormalHeader/Filters/FilterSectionTitle';
import TableButton from '@src/components/concrete/Table/InteractionTable/Buttons/TableButton';
import ColumnHeaderButton from '@src/components/concrete/Table/InteractionTable/ColumnHeader/ColumnHeaderButton';
import IconCell from '@src/components/concrete/Table/InteractionTable/Cells/IconCell';
import PopupCell from '@src/components/concrete/Table/InteractionTable/Cells/PopupCell';
import TextCell from '@src/components/concrete/Table/InteractionTable/Cells/TextCell';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { InvoicesGreen, InvoicesRed, InvoicesBlue, Settings, ShareWithOther } from '@src/components/concrete/Icons/svgs';
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';
import BrowserLink from '@src/components/abstract/Link';

// Helpers
import { ColorHelper } from '@src/helpers';

// Data
import { payoutFilters } from '@src/data/admin/filters';
import { payout } from '@src/data/admin/tables';
import { columns } from '@src/data/admin/tableDropdownOptions';

class PayoutTable extends React.Component {
  rowMenu = (index: number) => {
    return [
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Edit',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Add bank details',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Send invoice',
      },
    ];
  }

  render() {
    const colorHelper = new ColorHelper();
    const buttons = [
      (
        <PopupMenu
          buttonText="Dates"
          header={true}
          key="0"
          offset={{ right: 619 }}
          type="datepicker"
        />
      ),
    ];
    const filters = [
      (
        <div key="0">
          <section>
            <FilterSectionTitle text="Status" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={payoutFilters.status}
                isLarge={true}
              />
            </div>
          </section>
          <ContentSeparator marginNum={4} />
        </div>
      ),
      (
        <div key="1">
          <section>
            <FilterSectionTitle text="Category" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={payoutFilters.category}
                isLarge={true}
              />
            </div>
          </section>
          <ContentSeparator marginNum={4} />
        </div>
      ),
      (
        <div key="2">
          <section>
            <FilterSectionTitle text="Countries" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={payoutFilters.country}
                isLarge={true}
              />
            </div>
          </section>
          <ContentSeparator marginNum={4} />
        </div>
      ),
      (
        <div key="3">
          <section>
            <FilterSectionTitle text="Advanced" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={payoutFilters.advanced}
                isLarge={true}
              />
            </div>
          </section>
        </div>
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
              text="ID"
            />
          </th>
          <th className={css(styles.massive, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Financial entity"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Date"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.small, pagestyles.textNoWrap, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Check"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Payout"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Left to pay"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="To do"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Status"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Transaction"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Venue price"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Commission %"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Commission amount"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="VAT"
            />
          </th>
          <th className={css(styles.veryLarge, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Notes"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.leftText, padding.all_1)}>
            <PopupCell>
              <PopupMenu
                buttonChild={<Settings stylesArray={[pagestyles.icon, pagestyles.icon18]} />}
                checkboxes={columns.payout}
                title="Show these columns:"
                type="checks"
              />
            </PopupCell>
          </th>
        </tr>
      ),
    ];
    const rows = payout.map((row, index) => (
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
        <td className={css(styles.massive, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <BrowserLink
            className={css(pagestyles.link)}
            href="/" // TODO: correct link
          >
            {row.financial_entity}
          </BrowserLink>
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.date} />
        </td>
        <td className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, styles.small, pagestyles.textNoWrap, pagestyles.centeredText, padding.topbottom_2, padding.leftright_1)}>
          <IconCell>
            {row.check === 1 ? (
              <InvoicesGreen stylesArray={[pagestyles.icon, pagestyles.icon20]} />
            ) : (row.check === 2 ? (
              <InvoicesRed stylesArray={[pagestyles.icon, pagestyles.icon20]} />
            ) : (row.check === 3 ? (
              <InvoicesBlue stylesArray={[pagestyles.icon, pagestyles.icon20]} />
            ) : (
              null
            )))}
          </IconCell>
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.payout} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.to_pay} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TableButton
            // action={() => {}} // TODO: make this a proper action
            isWhite={true}
            text="Mark as paid"
          />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell
            text={row.status}
            textColor={colorHelper.getPayoutStatusLabelColour(row.statusId)}
          />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.transaction} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.price} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.commission_percent} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.commission_amount} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.vat} />
        </td>
        <td className={css(styles.veryLarge, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell
            isNotes={true}
            text="Notes ...Notes ...Notes ...Notes ...Notes ...Notes ...Notes ..."
          />
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
        filterItems={filters}
        fullSize={true}
        headerItems={heads}
        noMargin={true}
        rowItems={rows}
        title={`${payout.length} invoices`}
      />
    );
  }
}

export default PayoutTable;
