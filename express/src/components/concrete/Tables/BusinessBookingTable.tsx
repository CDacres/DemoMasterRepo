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
import HeaderButton from '@src/components/concrete/Table/InteractionTable/Buttons/HeaderButton';
import ColumnHeaderButton from '@src/components/concrete/Table/InteractionTable/ColumnHeader/ColumnHeaderButton';
import ImageCell from '@src/components/concrete/Table/InteractionTable/Cells/ImageCell';
import PopupCell from '@src/components/concrete/Table/InteractionTable/Cells/PopupCell';
import TextCell from '@src/components/concrete/Table/InteractionTable/Cells/TextCell';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { Arrow, Settings, ShareWithOther } from '@src/components/concrete/Icons/svgs';
import BrowserLink from '@src/components/abstract/Link';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Helpers
import { ColorHelper } from '@src/helpers';

// Data
import { bookingFilters } from '@src/data/business/filters';
import { booking } from '@src/data/business/tables';
import { columns } from '@src/data/business/tableDropdownOptions';

class BusinessBookingTable extends React.Component {
  rowMenu = (index: number) => {
    return [
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'users.email_user',
      },
    ];
  }

  render() {
    const colorHelper = new ColorHelper();
    const buttons = [
      (
        <HeaderButton
          // action={() => {}} // TODO: make this a proper action
          key="0"
          text="business.invite_your_teams"
        />
      ),
    ];
    const filters = [
      (
        <div key="0">
          <section>
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={bookingFilters.booking}
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
            <FilterSectionTitle text="common.status" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={bookingFilters.status}
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
          <th className={css(styles.idColumn, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.id"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.visibleColumnSmall, pagestyles.textNoWrap, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.status"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.visibleColumnLarge, styles.medium, pagestyles.textNoWrap, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="business.employee"
            />
          </th>
          <th className={css(styles.massive, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.space"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.visibleColumnSmall, pagestyles.textNoWrap, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.location"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.veryLarge, pagestyles.textNoWrap, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.dates"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.leftText, padding.all_1)}>
            <PopupCell>
              <PopupMenu
                buttonChild={<Settings stylesArray={[pagestyles.icon, pagestyles.icon18]} />}
                checkboxes={columns.bookings}
                title="common.show_columns"
                type="checks"
              />
            </PopupCell>
          </th>
        </tr>
      ),
    ];
    const rows = booking.map((row, index) => (
      <tr
        className={css(styles.tr)}
        key={index}
      >
        <td className={css(styles.idColumn, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.id} />
        </td>
        <td className={css(styles.smallScreenHiddenColumn, pagestyles.textNoWrap, padding.topbottom_2, padding.leftright_1)}>
          <TextCell
            text={row.status}
            textColor={colorHelper.getReservationStatusLabelColour(row.statusId)}
          />
        </td>
        <td className={css(styles.smallScreenHiddenColumn, pagestyles.textNoWrap, padding.topbottom_2, padding.leftright_1)}>
          <BrowserLink
            className={css(pagestyles.link)}
            href="/" // TODO: correct link
          >
            {row.employee}
          </BrowserLink>
        </td>
        <td className={css(styles.massive, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <ImageCell
            href="/" // TODO: correct link
            src="" // TODO: correct link
            text={row.space}
          />
        </td>
        <td className={css(styles.smallScreenHiddenColumn, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.location} />
        </td>
        <td className={css(styles.smallScreenHiddenColumn, styles.veryLarge, pagestyles.textNoWrap, padding.topbottom_2, padding.leftright_1)}>
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
      <Translatable attributes={{ title: { transKey: 'common.bookings_count', count: booking.length, replacements: { number: booking.length } } }}>
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

export default BusinessBookingTable;
