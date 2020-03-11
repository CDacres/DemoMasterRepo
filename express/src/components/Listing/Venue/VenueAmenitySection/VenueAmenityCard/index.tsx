/* tslint:disable:max-line-length */
import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS, observable } from 'mobx';
import { css } from 'aphrodite/no-important';

// Core
import { AmenityMeta, ListingsV1Space, VenueAmenity } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import Editor from '@src/components/Listing/Editor';
import CheckboxInput from '@src/components/Listing/Form/CheckboxInput';
import FormControlLabel from '@src/components/Listing/Form/FormControlLabel';
import { currencySymbol } from '@src/components/Listing/Form';
import Anchor from '@src/components/Listing/Buttons/Anchor';
import Coin from '@src/components/Listing/Venue/VenueAmenitySection/VenueAmenityCard/Coin';
import VenueAmenityDialog from '@src/components/Listing/Venue/VenueAmenitySection/VenueAmenityCard/VenueAmenityDialog';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  amenity: AmenityMeta;
  currency: string;
  disabled?: boolean;
  entry: VenueAmenity;
  spaces: ListingsV1Space[];
  setSpacesDirty?: VoidFunction;
};

type State = {
  clone?: VenueAmenity;
};

@observer
class VenueAmenityCard extends Editor<Props, State> {

  state: State = { clone: null };

  handleEdit = () => {
    const clone = observable(toJS(this.props.entry));
    this.setState({ clone });
  }

  handleClose = () => {
    this.setState({ clone: null });
  }

  handleSubmit = () => {
    const clone = toJS(this.state.clone);
    const { entry, model } = this.props;
    model.applyChanges(entry, clone);
    this.setState({ clone: null });
  }

  render() {
    const { amenity, currency, disabled, entry, model, spaces, setSpacesDirty } = this.props;
    const { clone } = this.state;
    const symbol = currencySymbol(currency);
    return (
      <div>
        <div className={css(styles.container)}>
          <FormControlLabel
            control={
              <CheckboxInput
                checked={entry.isActive}
                disabled={disabled}
                name="amenity"
                onChange={this.onInputCheckChange(entry, 'isActive')}
              />
            }
            label={
              <span>
                <Spell word={amenity.description} />
                {(amenity.isPriceable && !entry.isActive) ? (
                  <React.Fragment>
                    {' '}
                    <Coin>
                      {symbol}
                    </Coin>
                  </React.Fragment>
                ) : (
                  null
                )}
                {(amenity.isPriceable && !!entry.isActive) ? (
                  <React.Fragment>
                    {' '}
                    <Coin>
                      {(!!entry.price && !!entry.price.value) ? (symbol + entry.price.value) : (entry.isActive ? <Spell word="common.included" /> : symbol)}
                    </Coin>
                  </React.Fragment>
                ) : (
                  null
                )}
              </span>
            }
            noMarginRight={true}
          />
          {entry.isActive && (amenity.isCustomisable || amenity.isPriceable) ? (
            <React.Fragment>
              <span className={css(styles.separator)}>
                {' | '}
              </span>
              <Anchor onClick={this.handleEdit}>
                <Spell word="common.edit" />
              </Anchor>
            </React.Fragment>
          ) : (
            null
          )}
        </div>
        <VenueAmenityDialog
          amenity={amenity}
          currency={currency}
          entry={clone}
          model={model}
          onClose={this.handleClose}
          onSubmit={this.handleSubmit}
          open={!!clone}
          spaces={spaces}
          setSpacesDirty={setSpacesDirty}
        />
      </div>
    );
  }
}

export default VenueAmenityCard;
