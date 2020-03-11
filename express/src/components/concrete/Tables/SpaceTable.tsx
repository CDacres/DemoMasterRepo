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
import { MinusLine, Settings, ShareWithOther } from '@src/components/concrete/Icons/svgs';
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';
import BrowserLink from '@src/components/abstract/Link';

// Helpers
import { ColorHelper } from '@src/helpers';

// Data
import { spaceFilters } from '@src/data/admin/filters';
import { space } from '@src/data/admin/tables';
import { columns } from '@src/data/admin/tableDropdownOptions';

class SpaceTable extends React.Component {
  rowMenu = (index: number) => {
    return [
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Edit',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Delete',
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
                checkboxes={spaceFilters.status}
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
                checkboxes={spaceFilters.category}
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
                checkboxes={spaceFilters.country}
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
                checkboxes={spaceFilters.advanced}
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
              text="Space"
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
              text="Category"
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
              text="Venue"
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
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Service fee"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Flexible"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Ranking"
            />
          </th>
          <th className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="View"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.leftText, padding.all_1)}>
            <PopupCell>
              <PopupMenu
                buttonChild={<Settings stylesArray={[pagestyles.icon, pagestyles.icon18]} />}
                checkboxes={columns.spaces}
                title="Show these columns:"
                type="checks"
              />
            </PopupCell>
          </th>
        </tr>
      ),
    ];
    const rows = space.map((row, index) => (
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
            src="" // TODO: correct link
            text={row.space}
          />
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
          <TextCell text={row.category} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell
            text={row.status}
            textColor={colorHelper.getAssetApprovedLabelColour(row.approved)}
          />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.venue_name} />
          {' · '}
          <BrowserLink
            className={css(pagestyles.link)}
            href="/" // TODO: correct link
          >
            {row.venue_id}
          </BrowserLink>
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.country} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.city} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.service_fee} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          {row.flexible === '' ? (
            <IconCell>
              <MinusLine stylesArray={[pagestyles.icon, pagestyles.icon18]} />
            </IconCell>
          ) : (
            <TextCell text={row.flexible} />
          )}
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.ranking} />
        </td>
        <td className={css(styles.small, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.views} />
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
        title={`${space.length} spaces`}
      />
    );
  }
}

export default SpaceTable;
