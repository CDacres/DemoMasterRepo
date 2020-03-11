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
import ColumnHeaderButton from '@src/components/concrete/Table/InteractionTable/ColumnHeader/ColumnHeaderButton';
import PopupCell from '@src/components/concrete/Table/InteractionTable/Cells/PopupCell';
import TextCell from '@src/components/concrete/Table/InteractionTable/Cells/TextCell';
import { Settings, ShareWithOther } from '@src/components/concrete/Icons/svgs';
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Helpers
import { ColorHelper } from '@src/helpers';

// Data
import { invoiceFilters } from '@src/data/business/filters';
import { invoice } from '@src/data/business/tables';
import { columns } from '@src/data/business/tableDropdownOptions';

class InvoiceTable extends React.Component {
  rowMenu = (index: number) => {
    return [
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'business.download_invoice',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'business.send_invoice',
      },
    ];
  }

  render() {
    const colorHelper = new ColorHelper();
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
    ];
    const filters = [
      (
        <div key="0">
          <section>
            <FilterSectionTitle text="common.status" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={invoiceFilters.status}
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
              text="common.id"
            />
          </th>
          <th className={css(styles.veryLarge, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.date"
            />
          </th>
          <th className={css(styles.veryLarge, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.amount"
            />
          </th>
          <th className={css(styles.veryLarge, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.status"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.leftText, padding.all_1)}>
            <PopupCell>
              <PopupMenu
                buttonChild={<Settings stylesArray={[pagestyles.icon, pagestyles.icon18]} />}
                checkboxes={columns.invoices}
                title="common.show_columns"
                type="checks"
              />
            </PopupCell>
          </th>
        </tr>
      ),
    ];
    const rows = invoice.map((row, index) => (
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
        <td className={css(styles.veryLarge, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.date} />
        </td>
        <td className={css(styles.veryLarge, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.amount} />
        </td>
        <td className={css(styles.veryLarge, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell
            text={row.status}
            textColor={colorHelper.getInvoiceStatusLabelColour(row.statusId)}
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
      <Translatable attributes={{ title: { transKey: 'common.invoices_count', count: invoice.length, replacements: { number: invoice.length } } }}>
        <Table
          buttonItems={buttons}
          filterItems={filters}
          fullSize={true}
          headerItems={heads}
          noMargin={true}
          rowItems={rows}
        />
      </Translatable>
    );
  }
}

export default InvoiceTable;
