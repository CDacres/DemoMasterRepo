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
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Data
import { peopleFilters } from '@src/data/business/filters';
import { people } from '@src/data/business/tables';
import { columns } from '@src/data/business/tableDropdownOptions';

type Props = {
  type: 'all' | 'admin' | 'team';
};

class BusinessPeopleTable extends React.Component<Props> {
  rowMenuAdmin = (index: number) => {
    return [
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'users.delete_user',
      },
    ];
  }

  rowMenuAll = (index: number) => {
    return [
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'users.edit_role',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'users.email_user',
      },
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'users.delete_user',
      },
    ];
  }

  rowMenuTeam = (index: number) => {
    return [
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'users.delete_user',
      },
    ];
  }

  render() {
    const { type } = this.props;
    const buttons = [
      (
        <HeaderButton
          // action={() => {}} // TODO: make this a proper action
          key="0"
          text="business.invite_team"
        />
      ),
    ];
    const filters = [
      (
        <div key="0">
          <section>
            <FilterSectionTitle text="common.roles" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={peopleFilters.role}
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
          <th className={css(styles.large, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="common.name"
            />
          </th>
          <th className={css(styles.large, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="users.email"
            />
          </th>
          {type === 'all' ? (
            <th className={css(styles.huge, pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
              <ColumnHeaderButton
                // action={() => {}} // TODO: make this a proper action
                text="common.role"
              />
            </th>
          ) : (
            null
          )}
          <th className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.leftText, padding.all_1)}>
            <PopupCell>
              <PopupMenu
                buttonChild={<Settings stylesArray={[pagestyles.icon, pagestyles.icon18]} />}
                checkboxes={columns.people[type]}
                title="common.show_columns"
                type="checks"
              />
            </PopupCell>
          </th>
        </tr>
      ),
    ];
    const adminRows = people.admin.map((row, index) => (
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
        <td className={css(styles.large, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.name} />
        </td>
        <td className={css(styles.large, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.email} />
        </td>
        <td className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.centeredText, padding.topbottom_2, padding.leftright_1)}>
          <PopupCell>
            <PopupMenu
              buttonChild={<ShareWithOther stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconGrey]} />}
              data={this.rowMenuAdmin(index)}
              type="list"
            />
          </PopupCell>
        </td>
      </tr>
    ));
    const allRows = people.all.map((row, index) => (
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
        <td className={css(styles.large, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.name} />
        </td>
        <td className={css(styles.large, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.email} />
        </td>
        <td className={css(styles.huge, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.role} />
        </td>
        <td className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.centeredText, padding.topbottom_2, padding.leftright_1)}>
          <PopupCell>
            <PopupMenu
              buttonChild={<ShareWithOther stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconGrey]} />}
              data={this.rowMenuAll(index)}
              type="list"
            />
          </PopupCell>
        </td>
      </tr>
    ));
    const teamRows = people.team.map((row, index) => (
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
        <td className={css(styles.large, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.name} />
        </td>
        <td className={css(styles.large, pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.email} />
        </td>
        <td className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.centeredText, padding.topbottom_2, padding.leftright_1)}>
          <PopupCell>
            <PopupMenu
              buttonChild={<ShareWithOther stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconGrey]} />}
              data={this.rowMenuTeam(index)}
              type="list"
            />
          </PopupCell>
        </td>
      </tr>
    ));
    return (
      <Translatable attributes={{ title: { transKey: 'common.people_count_title', count: people[type].length, replacements: { number: people[type].length } } }}>
        <Table
          buttonItems={buttons}
          filterItems={filters}
          fullSize={true}
          headerItems={heads}
          noMargin={true}
          rowItems={type === 'all' ? allRows : type === 'admin' ? adminRows : teamRows}
        />
      </Translatable>
    );
  }
}

export default BusinessPeopleTable;
