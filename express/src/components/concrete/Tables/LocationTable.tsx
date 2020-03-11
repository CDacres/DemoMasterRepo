/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Modal from '@src/components/concrete/Modal';
import Location from '@src/components/concrete/Admin/Modals/Location';
import Table from '@src/components/concrete/Table';
import CheckboxColumns from '@src/components/concrete/Table/InteractionTable/CheckboxColumns';
import PopupMenu from '@src/components/concrete/Table/InteractionTable/PopupMenu';
import FilterSectionTitle from '@src/components/concrete/Table/InteractionTable/Headers/NormalHeader/Filters/FilterSectionTitle';
import HeaderButton from '@src/components/concrete/Table/InteractionTable/Buttons/HeaderButton';
import TableButton from '@src/components/concrete/Table/InteractionTable/Buttons/TableButton';
import ColumnHeaderButton from '@src/components/concrete/Table/InteractionTable/ColumnHeader/ColumnHeaderButton';
import IconCell from '@src/components/concrete/Table/InteractionTable/Cells/IconCell';
import PopupCell from '@src/components/concrete/Table/InteractionTable/Cells/PopupCell';
import TextCell from '@src/components/concrete/Table/InteractionTable/Cells/TextCell';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { Lightning, MinusLine, Settings, ShareWithOther } from '@src/components/concrete/Icons/svgs';
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';

// Data
import { locationFilters } from '@src/data/admin/filters';
import { location } from '@src/data/admin/tables';
import { columns } from '@src/data/admin/tableDropdownOptions';

// Types
import { LocationTableData } from '@src/typings/types';

type State = {
  addModalOpen: boolean;
  currentRowData?: LocationTableData;
  editModalOpen: boolean;
};

class LocationTable extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      addModalOpen: false,
      currentRowData: null,
      editModalOpen: false,
    };
  }

  toggleAddModal = (): void => {
    this.setState({ addModalOpen: !this.state.addModalOpen });
  }

  toggleEditModal = (): void => {
    this.setState({ editModalOpen: !this.state.editModalOpen });
  }

  addLocation = (): void => {
    // TODO: validation then save location
  }

  updateLocation = (): void => {
    // TODO: validation then update location
  }

  toggleEditing = (index: number) => {
    this.setState({ currentRowData: location[index] });
    this.toggleEditModal();
  }

  rowMenu = (index: number) => {
    return [
      {
        action: () => this.toggleEditing(index),
        text: 'Edit',
      },
    ];
  }

  render() {
    const { addModalOpen, currentRowData, editModalOpen } = this.state;
    const buttons = [
      (
        <HeaderButton
          action={this.toggleAddModal}
          key="0"
          text="Add location"
        />
      ),
    ];
    const filters = [
      (
        <div key="0">
          <section>
            <FilterSectionTitle text="Countries" />
            <div className={css(margin.topbottom_2)}>
              <CheckboxColumns
                checkboxes={locationFilters.country}
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
                checkboxes={locationFilters.category}
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
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Location"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="To do"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Live"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Parent"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, pagestyles.centeredText, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Url"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Category"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Lat/long"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Venues"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Meeting"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Office"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Party"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Dining"
            />
          </th>
          <th className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.all_1)}>
            <ColumnHeaderButton
              // action={() => {}} // TODO: make this a proper action
              text="Wedding"
            />
          </th>
          <th className={css(styles.smallScreenHiddenColumn, styles.setWidthColumn, pagestyles.textNoWrap, pagestyles.leftText, padding.all_1)}>
            <PopupCell>
              <PopupMenu
                buttonChild={<Settings stylesArray={[pagestyles.icon, pagestyles.icon18]} />}
                checkboxes={columns.locations}
                title="Show these columns:"
                type="checks"
              />
            </PopupCell>
          </th>
        </tr>
      ),
    ];
    const rows = location.map((row, index) => (
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
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.autocompleteLocation} />
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          {row.in_sitemap ? (
            <IconCell>
              <MinusLine stylesArray={[pagestyles.icon, pagestyles.icon18]} />
            </IconCell>
          ) : (
            <TableButton
              // action={() => {}} // TODO: make this a proper action
              isWhite={true}
              text="Set to live"
            />
          )}
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <IconCell>
            {row.in_sitemap ? (
              <Lightning stylesArray={[pagestyles.icon, pagestyles.icon20, pagestyles.iconYellow]} />
            ) : (
              <MinusLine stylesArray={[pagestyles.icon, pagestyles.icon18]} />
            )}
          </IconCell>
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.parent_desc} />
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.url_desc} />
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.locationcategorie_id} />
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={`${row.lat}, ${row.long}`} />
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.venues} />
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.meeting} />
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.office} />
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.party} />
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.dining} />
        </td>
        <td className={css(pagestyles.textNoWrap, pagestyles.tableCell, padding.topbottom_2, padding.leftright_1)}>
          <TextCell text={row.wedding} />
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
      <React.Fragment>
        {addModalOpen &&
          <Modal
            action={this.toggleAddModal}
            hasMobile={false}
          >
            <Location
              onCancelClick={this.toggleAddModal}
              onSuccessClick={this.addLocation}
            />
          </Modal>
        }
        {editModalOpen &&
          <Modal
            action={this.toggleEditModal}
            hasMobile={false}
          >
            <Location
              currentData={currentRowData}
              editing={true}
              onCancelClick={this.toggleEditModal}
              onSuccessClick={this.updateLocation}
            />
          </Modal>
        }
        <Table
          buttonItems={buttons}
          filterItems={filters}
          fullSize={true}
          headerItems={heads}
          noMargin={true}
          rowItems={rows}
          title={`${location.length} locations`}
        />
      </React.Fragment>
    );
  }
}

export default LocationTable;
