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
import PopupCell from '@src/components/concrete/Table/InteractionTable/Cells/PopupCell';
import TextCell from '@src/components/concrete/Table/InteractionTable/Cells/TextCell';
import { Settings, ShareWithOther } from '@src/components/concrete/Icons/svgs';
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';

// Data
import { userFilters } from '@src/data/admin/filters';
import { user } from '@src/data/admin/tables';
import { columns } from '@src/data/admin/tableDropdownOptions';

class UserTable extends React.Component {
  rowMenu = (index: number) => {
    return [
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Edit',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Adopt profile',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Suspend user',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'Delete user',
      },
    ];
  }

  render() {
    const buttons = [
      (
        <HeaderButton
          // action={() => {}} // TODO: make this a proper action
          key="0"
          text="Add user"
        />
      ),
    ];
    const filters = [
      (
        <div key="0">
          <section>
            <FilterSectionTitle text="Type" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={userFilters.type}
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
          <th className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Name"
            />
          </th>
          <th className={css(styles.large, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Email"
            />
          </th>
          <th className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Phone"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Type"
            />
          </th>
          <th className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Created"
            />
          </th>
          <th className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Last activity"
            />
          </th>
          <th className={css(styles.medium, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Bookings"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.leftText, padding.all_1)}>
            <PopupCell>
              <PopupMenu
                buttonChild={<Settings stylesArray={[pagestyles.icon, pagestyles.icon18]} />}
                checkboxes={columns.users}
                title="Show these columns:"
                type="checks"
              />
            </PopupCell>
          </th>
        </tr>
      ),
    ];
    const rows = user.map((row, index) => (
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
        <td className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.name} />
        </td>
        <td className={css(styles.large, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.email} />
        </td>
        <td className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.phone} />
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.type} />
        </td>
        <td className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell
            isDateTime={true}
            text={row.created}
          />
        </td>
        <td className={css(styles.verySmall, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell
            isDateTime={true}
            text={row.last_activity_date}
          />
          <br />
          <TextCell
            isDateTime={true}
            text={row.last_activity_time}
          />
        </td>
        <td className={css(styles.medium, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.bookings} />
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
        title={`${user.length} users`}
      />
    );
  }
}

export default UserTable;
