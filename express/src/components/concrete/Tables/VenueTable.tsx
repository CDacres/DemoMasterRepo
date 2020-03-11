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
import ImageCell from '@src/components/concrete/Table/InteractionTable/Cells/ImageCell';
import PopupCell from '@src/components/concrete/Table/InteractionTable/Cells/PopupCell';
import TextCell from '@src/components/concrete/Table/InteractionTable/Cells/TextCell';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { Agree, Lightning, Planet, MinusLine, Settings, ShareWithOther, Sponsored } from '@src/components/concrete/Icons/svgs';
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import BrowserLink from '@src/components/abstract/Link';
import InteractionLink from '@src/components/concrete/InteractionLink';

// Helpers
import { ColorHelper } from '@src/helpers';

// Data
import { venueFilters } from '@src/data/admin/filters';
import { venue } from '@src/data/admin/tables';
import { admins, columns } from '@src/data/admin/tableDropdownOptions';

class VenueTable extends React.Component {
  rowMenu = (index: number) => {
    return [
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Edit',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Advanced',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Delete',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Merge',
      },
    ];
  }

  render() {
    const colorHelper = new ColorHelper();
    const filters = [
      (
        <div key="0">
          <section>
            <FilterSectionTitle text="Status" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={venueFilters.status}
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
            <FilterSectionTitle text="Owner" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={venueFilters.admin}
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
                checkboxes={venueFilters.country}
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
            <FilterSectionTitle text="Category" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={venueFilters.category}
                isLarge={true}
              />
            </div>
          </section>
          <ContentSeparator marginNum={4} />
        </div>
      ),
      (
        <div key="4">
          <section>
            <FilterSectionTitle text="Advanced" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={venueFilters.advanced}
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
              text="Venue name"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Country"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="City"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Contact"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Email"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Phone"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Website"
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
              text="Agree"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Sponsored"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.small, pagestyles.textNoWrap, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Instant book"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Commission %"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Created"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Last modified"
            />
          </th>
          <th className={css(styles.veryLarge, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Notes"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Assigned"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.leftText, padding.all_1)}>
            <PopupCell>
              <PopupMenu
                buttonChild={<Settings stylesArray={[pagestyles.icon, pagestyles.icon18]} />}
                checkboxes={columns.venues}
                title="Show these columns:"
                type="checks"
              />
            </PopupCell>
          </th>
        </tr>
      ),
    ];
    const rows = venue.map((row, index) => (
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
          <ImageCell
            href="/" // TODO: correct link
            secondText={row.venue_address}
            src="" // TODO: correct link
            text={row.venue_name}
          />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.country} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.city} />
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.contact} />
          {' · '}
          <BrowserLink
            className={css(pagestyles.link)}
            href="/" // TODO: correct link
          >
            Adopt
          </BrowserLink>
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <InteractionLink
            className={css(pagestyles.link)}
            mail={row.email}
          >
            {row.email}
          </InteractionLink>
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.phone} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          {row.website === '' ? (
            <IconCell>
              <MinusLine stylesArray={[pagestyles.icon, pagestyles.icon18]} />
            </IconCell>
          ) : (
            <a
              className={css(pagestyles.link)}
              href={row.website}
              rel="noopener"
              target="_blank"
            >
              <IconCell>
                <Planet stylesArray={[pagestyles.icon, pagestyles.icon20]} />
              </IconCell>
            </a>
          )}
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          {row.approved ? (
            <IconCell>
              <MinusLine stylesArray={[pagestyles.icon, pagestyles.icon18]} />
            </IconCell>
          ) : (
            <TableButton
              // action={() => {}} // TODO: make this a proper action
              isWhite={true}
              text="Approved"
            />
          )}
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell
            text={row.status}
            textColor={colorHelper.getAssetApprovedLabelColour(row.approved)}
          />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <IconCell>
            {row.agree ? (
              <Agree stylesArray={[pagestyles.icon, pagestyles.icon20]} />
            ) : (
              <MinusLine stylesArray={[pagestyles.icon, pagestyles.icon18]} />
            )}
          </IconCell>
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <IconCell>
            {row.sponsored ? (
              <Sponsored stylesArray={[pagestyles.icon, pagestyles.icon20]} />
            ) : (
              <MinusLine stylesArray={[pagestyles.icon, pagestyles.icon18]} />
            )}
          </IconCell>
        </td>
        <td className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.centeredText, padding.topbottom_2, padding.leftright_1)}>
          <IconCell>
            {row.instant_book ? (
              <Lightning stylesArray={[pagestyles.icon, pagestyles.icon20, pagestyles.iconYellow]} />
            ) : (
              <MinusLine stylesArray={[pagestyles.icon, pagestyles.icon18]} />
            )}
          </IconCell>
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.commission} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell
            isDateTime={true}
            text={row.created}
          />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell
            isDateTime={true}
            text={row.last_modified}
          />
        </td>
        <td className={css(styles.veryLarge, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell
            isNotes={true}
            text="Notes ...Notes ...Notes ...Notes ...Notes ...Notes ...Notes ..."
          />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <StyledInput
            defaultOptionText="Select..."
            id={`admin_${index}`}
            name={`admin_${index}`}
            selectOptions={admins}
            value={row.assigned}
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
        filterItems={filters}
        fullSize={true}
        headerItems={heads}
        noMargin={true}
        rowItems={rows}
        title={`${venue.length} venues`}
      />
    );
  }
}

export default VenueTable;
