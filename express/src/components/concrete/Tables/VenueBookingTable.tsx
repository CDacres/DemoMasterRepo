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
import ColumnHeaderText from '@src/components/concrete/Table/InteractionTable/ColumnHeader/ColumnHeaderText';
import IconCell from '@src/components/concrete/Table/InteractionTable/Cells/IconCell';
import ImageCell from '@src/components/concrete/Table/InteractionTable/Cells/ImageCell';
import PopupCell from '@src/components/concrete/Table/InteractionTable/Cells/PopupCell';
import TextCell from '@src/components/concrete/Table/InteractionTable/Cells/TextCell';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { Arrow, MinusLine, Settings, ShareWithOther } from '@src/components/concrete/Icons/svgs';
import BrowserLink from '@src/components/abstract/Link';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Helpers
import { ColorHelper } from '@src/helpers';

// Data
import { bookingFilters } from '@src/data/dashboard/filters';
import { booking } from '@src/data/dashboard/tables';
import { columns } from '@src/data/dashboard/tableDropdownOptions';

class VenueBookingTable extends React.Component {
  rowMenu = (index: number) => {
    return [
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'dashboard.message_client',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'dashboard.manage_booking',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'dashboard.view_receipt',
      },
    ];
  }

  render() {
    const colorHelper = new ColorHelper();
    const filters = [
      (
        <div key="0">
          <section>
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={bookingFilters.venue.state}
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
                checkboxes={bookingFilters.venue.status}
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
            <FilterSectionTitle text="dashboard.payment_status" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={bookingFilters.venue.payout}
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
          <th className={css(styles.massive, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.space"
            />
          </th>
          <th className={css(styles.tiny, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.leftText, padding.all_1)}>
            <ColumnHeaderText text="common.to_do" />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.visibleColumnLarge, styles.medium, pagestyles.textNoWrap, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="dashboard.client"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.visibleColumnLarge, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.dates"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.visibleColumnSmall, pagestyles.textNoWrap, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.total"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.visibleColumnSmall, pagestyles.textNoWrap, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="dashboard.payout"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.leftText, padding.all_1)}>
            <PopupCell>
              <PopupMenu
                buttonChild={<Settings stylesArray={[pagestyles.icon, pagestyles.icon18]} />}
                checkboxes={columns.bookings.venue}
                title="common.show_columns"
                type="checks"
              />
            </PopupCell>
          </th>
        </tr>
      ),
    ];
    const rows = booking.venue.map((row, index) => (
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
        <td className={css(styles.massive, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <ImageCell
            href="/" // TODO: correct link
            src="" // TODO: correct link
            text={row.space}
          />
        </td>
        <td className={css(styles.tiny, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          {row.to_do ? (
            <TableButton
              // action={() => {}} // TODO: make this a proper action
              isWhite={true}
              text="dashboard.reply_to_request"
            />
          ) : (
            <IconCell>
              <MinusLine stylesArray={[pagestyles.icon, pagestyles.icon18]} />
            </IconCell>
          )}
        </td>
        <td className={css(styles.smallScreenHiddenColumn, pagestyles.textNoWrap, padding.topbottom_2, padding.leftright_1)}>
          <BrowserLink
            className={css(pagestyles.link)}
            href="/" // TODO: correct link
          >
            {row.client}
          </BrowserLink>
        </td>
        <td className={css(styles.smallScreenHiddenColumn, pagestyles.textNoWrap, padding.topbottom_2, padding.leftright_1)}>
          {row.date ? (
            <React.Fragment>
              <TextCell
                isDateTime={true}
                text={row.date}
              />
              <br />
              <TextCell
                isDateTime={true}
                text={row.time_from}
              />
              {row.time_to &&
                <React.Fragment>
                  <div className={css(pagestyles.inlineBlock, margin.leftright_1_5)}>
                    <Arrow
                      direction="right"
                      stylesArray={[pagestyles.icon, pagestyles.icon12]}
                    />
                  </div>
                  <TextCell
                    isDateTime={true}
                    text={row.time_to}
                  />
                </React.Fragment>
              }
            </React.Fragment>
          ) : (
            <React.Fragment>
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
            </React.Fragment>
          )}
        </td>
        <td className={css(styles.smallScreenHiddenColumn, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.total} />
        </td>
        <td className={css(styles.smallScreenHiddenColumn, padding.topbottom_2, padding.leftright_1)}>
          {row.payout === '' ? (
            <IconCell>
              <MinusLine stylesArray={[pagestyles.icon, pagestyles.icon18]} />
            </IconCell>
          ) : (
            <TextCell text={row.payout} />
          )}
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
      <Translatable attributes={{ title: { transKey: 'common.bookings_count', count: booking.venue.length, replacements: { number: booking.venue.length } } }}>
        <Table
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

export default VenueBookingTable;
