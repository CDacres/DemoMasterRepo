import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { CarteItem, CarteMenu } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import CloseButton from '@src/components/Listing/Buttons/CloseButton';
import DragIndicator from '@src/components/Listing/Icons/DragIndicator';
import Currency from '@src/components/Listing/Form/Currency';
import FormFieldError from '@src/components/Listing/Form/FormFieldError';
import NumberInput from '@src/components/Listing/Form/NumberInput';
import Editor from '@src/components/Listing/Editor';
import Strip from '@src/components/Listing/Layout/Strip';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Models
import { VenueCarteModel } from '@src/components/Listing/Models';

type Props = {
  currency: string;
  entry: CarteItem;
  group: CarteMenu;
  onRemove: VoidFunction;
};

@observer
class VenueCarteGroupItem extends Editor<Props, {}, VenueCarteModel> {
  render() {
    const { currency, entry, group, model: { menuErrors }, onRemove } = this.props;
    let carteErrors: string[] = [];
    if (menuErrors !== null) {
      const errorList = menuErrors.filter(e => e.carteMenu === group && e.item === entry);
      if (errorList.length) {
        carteErrors = errorList.first().result;
      }
    }
    return (
      <React.Fragment>
        <Strip
          colGap="8px"
          cols="auto 1fr 160px 24px"
        >
          <DragIndicator />
          <span className={css(styles.text)}>
            {entry.description}
          </span>
          <ValidationWrapper errors={carteErrors}>
            <NumberInput
              errors={carteErrors}
              leading={<Currency currency={currency} />}
              name="price"
              onValueChange={this.onNumberFloatChange(entry, 'price')}
              placeholder="0"
              value={entry.price}
            />
            <FormFieldError errors={carteErrors} />
          </ValidationWrapper>
          {entry.isFixed ? (
            null
          ) : (
            <CloseButton onClick={onRemove} />
          )}
        </Strip>
      </React.Fragment>
    );
  }
}

export default VenueCarteGroupItem;
