/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

// Components
import Table from '@src/components/concrete/Table';
import PopupMenu from '@src/components/concrete/Table/InteractionTable/PopupMenu';
import HeaderButton from '@src/components/concrete/Table/InteractionTable/Buttons/HeaderButton';
import ColumnHeaderButton from '@src/components/concrete/Table/InteractionTable/ColumnHeader/ColumnHeaderButton';
import PopupCell from '@src/components/concrete/Table/InteractionTable/Cells/PopupCell';
import TextCell from '@src/components/concrete/Table/InteractionTable/Cells/TextCell';
import { Settings, ShareWithOther } from '@src/components/concrete/Icons/svgs';
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Data
import { team } from '@src/data/dashboard/tables';
import { columns } from '@src/data/dashboard/tableDropdownOptions';

class MemberTable extends React.Component {
  rowMenu = (index: number) => {
    return [
      {
        action: () => alert(index), // TODO: make this a proper action
        text: 'users.delete_user',
      },
    ];
  }

  render() {
    const buttons = [
      (
        <HeaderButton
          // action={() => {}} // TODO: make this a proper action
          key={0}
          text="dashboard.venue_add_user"
        />
      ),
      (
        <HeaderButton
          // action={() => {}} // TODO: make this a proper action
          isWhite={true}
          key={1}
          text="dashboard.venue_add_bulk_user"
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
          <th className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.leftText, padding.all_1)}>
            <PopupCell>
              <PopupMenu
                buttonChild={<Settings stylesArray={[pagestyles.icon, pagestyles.icon18]} />}
                checkboxes={columns.team.member}
                title="common.show_columns"
                type="checks"
              />
            </PopupCell>
          </th>
        </tr>
      ),
    ];
    const rows = team.member.map((row, index) => (
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
              data={this.rowMenu(index)}
              type="list"
            />
          </PopupCell>
        </td>
      </tr>
    ));
    return (
      <Translatable attributes={{ title: { transKey: 'common.users_count', count: team.member.length, replacements: { number: team.member.length } } }}>
        <Table
          buttonItems={buttons}
          fullSize={true}
          headerItems={heads}
          noMargin={true}
          rowItems={rows}
        />
      </Translatable>
    );
  }
}

export default MemberTable;
