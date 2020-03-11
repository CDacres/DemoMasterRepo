import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ModalBottom from '@src/components/concrete/Modal/ModalBottom';
import ModalTop from '@src/components/concrete/Modal/ModalTop';
import StyledCheckbox from '@src/components/concrete/Inputs/StyledCheckbox';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';
import StyledLabel from '@src/components/concrete/Inputs/StyledLabel';

// Data
import { locationCategories, locationParents } from '@src/data/admin/page';

// Types
import { LocationTableData } from '@src/typings/types';

type Props = {
  currentData?: LocationTableData;
  editing?: boolean;
  onCancelClick: () => void;
  onSuccessClick: () => void;
};

const Location = ({ currentData, editing, onCancelClick, onSuccessClick }: Props) => (
  <React.Fragment>
    <ModalTop text={`${editing ? 'Edit' : 'Add'} location`} />
    <section>
      <div className={css(margin.top_3)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
            <StyledInput
              id="place"
              label="Autocomplete location"
              name="place"
              required={true}
              value={currentData && currentData.autocompleteLocation}
            />
            {/* TODO: add autocomplete */}
          </div>
        </div>
      </div>
      <div className={css(margin.top_3)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
            <StyledInput
              id="name"
              label="Name"
              name="name"
              required={true}
              value={currentData && currentData.human_desc}
            />
          </div>
        </div>
      </div>
      <div className={css(margin.top_3)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
            <StyledInput
              id="parent"
              label="Parent"
              name="parent"
              required={true}
              selectOptions={locationParents}
              value={currentData && currentData.parent_id}
            />
          </div>
        </div>
      </div>
      <div className={css(margin.top_3)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
            <StyledInput
              id="url"
              label="Url"
              name="url"
              placeholder="east-croydon"
              required={true}
              value={currentData && currentData.url_desc}
            />
          </div>
        </div>
      </div>
      <div className={css(margin.top_3)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
            <StyledInput
              id="category"
              label="Category"
              name="category"
              selectOptions={locationCategories}
              value={currentData && currentData.locationcategorie_id}
            />
          </div>
        </div>
      </div>
      <div className={css(margin.top_3)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
            <StyledInput
              id="lat"
              label="Lat"
              name="lat"
              required={true}
              value={currentData && currentData.lat}
            />
          </div>
          <div className={css(pagestyles.column, pagestyles.halfColumn, pagestyles.columnFloat, padding.leftright_1)}>
            <StyledInput
              id="long"
              label="Long"
              name="long"
              required={true}
              value={currentData && currentData.long}
            />
          </div>
        </div>
      </div>
      <div className={css(margin.top_3)}>
        <div className={css(pagestyles.row, pagestyles.clearfix)}>
          <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
            <StyledInput
              id="diagonal"
              label="Diagonal distance (km)"
              name="diagonal"
              required={true}
              value={currentData && currentData.bounds_distance}
            />
          </div>
        </div>
      </div>
      <StyledLabel
        id="crawlable"
        label="Crawlable?"
      />
      <StyledCheckbox
        checked={currentData && currentData.in_sitemap}
        id="crawlable"
        name="crawlable"
      />
    </section>
    <ModalBottom
      onCancelClick={onCancelClick}
      onSuccessClick={onSuccessClick}
      successText={editing ? 'common.update' : 'common.add'}
    />
  </React.Fragment>
);

export default Location;
